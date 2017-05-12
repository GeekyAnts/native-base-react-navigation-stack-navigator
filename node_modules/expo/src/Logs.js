'use strict';

import UUID from 'uuid-js';

import * as Constants from './Constants';
import Queue from './lib/Queue';

let logQueue = new Queue();
let logCounter = 0;
let sessionId = UUID.create().toString();
let isSendingLogs = false;
let groupDepth = 0;

export function enableXDELogging() {
    // don't use level below info. only use debug for things that
  // shouldn't be shown to the developer.
  replaceConsoleFunction('log', 'info');
  replaceConsoleFunction('debug', 'info');
  replaceConsoleFunction('info', 'info');
  replaceConsoleFunction('warn', 'warn');
  replaceConsoleFunction('error', 'error');

  // console.group
  let originalGroup = console.group;
  console.group = function(...args) {
    if (originalGroup) {
      originalGroup.apply(console, args);
    }

    queueRemoteLog('info', {}, args);
    groupDepth++;
  };
  console.group.__restore = function() {
    console.group = originalGroup;
  };

  let originalGroupCollapsed = console.groupCollapsed;
  console.groupCollapsed = function(...args) {
    if (originalGroupCollapsed) {
      originalGroupCollapsed.apply(console, args);
    }

    queueRemoteLog('info', {
      groupCollapsed: true,
    }, args);
    groupDepth++;
  };
  console.groupCollapsed.__restore = function() {
    console.groupCollapsed = originalGroupCollapsed;
  };

  let originalGroupEnd = console.groupEnd;
  console.groupEnd = function(...args) {
    if (originalGroupEnd) {
      originalGroupEnd.apply(console, args);
    }

    if (groupDepth > 0) {
      groupDepth--;
    }
    queueRemoteLog('info', {
      shouldHide: true,
    }, args);
  };
  console.groupEnd.__restore = function() {
    console.groupEnd = originalGroupEnd;
  };

  // console.assert
  let originalAssert = console.assert;
  console.assert = function(assertion, errorString) {
    if (originalAssert) {
      originalAssert.apply(console, [assertion, errorString]);
    }

    if (!assertion) {
      queueRemoteLog('error', {}, `Assertion failed: ${errorString}`);
    }
  };
  console.assert.__restore = function() {
    console.assert = originalAssert;
  };

  // TODO: support rest of console methods
}

export function disableXDELogging() {
  console.log.__restore();
  console.debug.__restore();
  console.info.__restore();
  console.warn.__restore();
  console.error.__restore();

  console.group.__restore();
  console.groupCollapsed.__restore();
  console.groupEnd.__restore();

  console.assert.__restore();

  // TODO: support rest of console methods
}

/** Helpers **/

async function sendRemoteLogsAsync() {
  if (isSendingLogs) {
    return;
  }

  let logs = [];
  let currentLog = logQueue.dequeue();
  if (!currentLog) {
    return;
  } else {
    isSendingLogs = true;
  }

  while (currentLog) {
    logs.push(currentLog);
    currentLog = logQueue.dequeue();
  }

  try {
    await fetch(Constants.manifest.logUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'Proxy-Connection': 'keep-alive',
        'Accept': 'application/json',
        'Device-Id': Constants.deviceId,
        'Device-Name': Constants.deviceName,
        'Session-Id': sessionId,
      },
      body: JSON.stringify(logs),
    });
  } catch (e) {}

  isSendingLogs = false;
  sendRemoteLogsAsync();
}

function queueRemoteLog(level, additionalFields, args) {
  logQueue.enqueue({
    count: logCounter++,
    level,
    groupDepth,
    body: args,
    ...additionalFields,
  });

  // don't block on this
  sendRemoteLogsAsync();
}

function replaceConsoleFunction(consoleFunc, level, additionalFields) {
  const original = console[consoleFunc];
  const newConsoleFunc = function(...args) {
    if (original) {
      original.apply(console, args);
    }
    queueRemoteLog(level, additionalFields, args);
  };

  newConsoleFunc.__restore = function() {
    console[consoleFunc] = original;
  };

  console[consoleFunc] = newConsoleFunc;
}

// Enable by default
if (Constants.manifest && Constants.manifest.logUrl) {
  enableXDELogging();
}

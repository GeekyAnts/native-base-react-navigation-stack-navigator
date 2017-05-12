# spawn-async [![CircleCI](https://circleci.com/gh/exponentjs/spawn-async.svg?style=svg)](https://circleci.com/gh/exponentjs/spawn-async) [![Build Status](https://travis-ci.org/exponentjs/spawn-async.svg?branch=master)](https://travis-ci.org/exponentjs/spawn-async)

A cross-platform version of Node's `child_process.spawn` as an async function that returns a promise.

## Usage:
```js
import spawnAsync from '@exponent/spawn-async';

let resultPromise = spawnAsync('echo', ['hello', 'world'], { stdio: 'inherit' });
let spawnedChildProcess = resultPromise.child;
try {
  let {
    pid,
    output: [stdout, stderr],
    stdout,
    stderr,
    status,
    signal,
  } = await resultPromise;
} catch (e) {
  console.error(e.stack);
  // The error object also has the same properties as the result object
}
```

## API

`spawnAsync` takes the same arguments as [`child_process.spawn`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options).

It returns a promise whose result is an object with these properties:

- `pid`: the process ID of the spawned child process
- `output`: an array with stdout and stderr's output
- `stdout`: a string of what the child process wrote to stdout
- `stderr`: a string of what the child process wrote to stderr
- `status`: the exit code of the child process
- `signal`: the signal (ex: `SIGTERM`) used to stop the child process if it did not exit on its own

If there's an error running the child process or it exits with a non-zero status code, `spawnAsync` rejects the returned promise. The Error object also has the properties listed above.

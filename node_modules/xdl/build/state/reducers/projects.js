'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const actions = exports.actions = {
  selectPackagerPane: projectRoot => {
    return {
      type: 'SELECT_PACKAGER_PANE',
      projectRoot
    };
  },

  selectNotificationsPane: projectRoot => {
    return {
      type: 'SELECT_NOTIFICATIONS_PANE',
      projectRoot
    };
  },

  togglePane: projectRoot => {
    return {
      type: 'TOGGLE_PANE',
      projectRoot
    };
  }
};

const TOGGLE = -1;
const PACKAGER_PANE = 0;
const NOTIFICATIONS_PANE = 1;

const INITIAL_PROJECT_STATE = {
  selectedLeftPane: PACKAGER_PANE,
  isPackagerSelected: true,
  isNotificationsSelected: false
};

const reducer = exports.reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_PACKAGER_PANE':
      return _selectPane(state, action, PACKAGER_PANE);
    case 'SELECT_NOTIFICATIONS_PANE':
      return _selectPane(state, action, NOTIFICATIONS_PANE);
    case 'TOGGLE_PANE':
      return _selectPane(state, action, TOGGLE);
    default:
      return state;
  }
};

function _selectPane(state, action, pane) {
  let { projectRoot } = action;

  let projectObject = state[projectRoot] || INITIAL_PROJECT_STATE;
  if (pane === TOGGLE) {
    pane = projectObject.selectedLeftPane === PACKAGER_PANE ? NOTIFICATIONS_PANE : PACKAGER_PANE;
  }

  projectObject.selectedLeftPane = pane;
  projectObject.isPackagerSelected = pane === PACKAGER_PANE;
  projectObject.isNotificationsSelected = pane === NOTIFICATIONS_PANE;

  // TODO: switch to immutable.js
  let newState = JSON.parse(JSON.stringify(state));
  newState[projectRoot] = projectObject;

  return newState;
}
//# sourceMappingURL=../../__sourcemaps__/state/reducers/projects.js.map

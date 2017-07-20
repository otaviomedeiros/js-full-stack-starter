import { combineReducers } from 'redux';

function defaultReducer(state = {}, action) {
  return state;
}

export default combineReducers({
  defaultReducer
});

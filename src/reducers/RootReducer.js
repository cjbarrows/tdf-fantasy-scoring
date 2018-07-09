import { combineReducers } from 'redux';
import dataReducer from './DataReducer';
import teams from './TeamsReducer';

export default combineReducers({
  dataReducer,
  teams,
});

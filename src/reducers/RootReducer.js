import { combineReducers } from 'redux';
import simpleReducer from './SimpleReducer';
import dataReducer from './DataReducer';
import teams from './TeamsReducer';

export default combineReducers({
  simpleReducer,
  dataReducer,
  teams,
});

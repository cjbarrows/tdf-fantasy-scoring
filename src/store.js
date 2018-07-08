import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';

import myInitialState from './InitialState.json';

export default function configureStore(initialState = myInitialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

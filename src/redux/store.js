import initialState from './initialState';
import { createStore, combineReducers } from 'redux';
import tablesReducer from './postsRedux';

const subreducers = {
  tables: tablesReducer,
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

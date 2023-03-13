import shortid from 'shortid';
import { API_URL } from '../config';
export let pending = false;
//selectors
export const getAllTables = (state) => {
  return state.tables;
};
export const getTableById = ({ tables }, tableId) => tables.find((table) => table.id === tableId);
export const getNewId = (state, tablesIds = []) => {
  //get array of all tables ids
  state.tables.forEach((table) => {
    tablesIds = [...tablesIds, parseInt(table.id)];
  });
  //return lowest available id number
  return String(tablesIds.sort((a, b) => a - b).reduce((prev, curr) => prev + (prev === curr), 1));
};

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const ADD_TABLE = createActionName('ADD_TABLE');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
// action creators
export const addTable = (payload) => ({ type: ADD_TABLE, payload });
export const updateTable = (payload) => ({ type: UPDATE_TABLE, payload });
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const removeTable = (payload) => ({ type: REMOVE_TABLE, payload });

export const addTableRequest = (newTable) => {
  pending = true;
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTable),
    };

    fetch(API_URL + '/tables', options)
      .then(() => dispatch(addTable(newTable)))
      .catch((error) => {
        console.log(error);
      });
  };
};

export const removeTableRequest = (table) => {
  pending = true;
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = API_URL + '/tables/' + table;
    fetch(url, options)
      .then(() => dispatch(removeTable(table)))
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateTableRequest = (newProperties) => {
  pending = true;
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProperties),
    };
    const url = API_URL + '/tables/' + newProperties.id;
    fetch(url, options)
      .then(() => dispatch(updateTable(newProperties)))
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchTables = () => {
  pending = true;
  return (dispatch) => {
    fetch(API_URL + '/tables')
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)))
      .then((pending = false))
      .catch((error) => {
        console.log(error);
      });
  };
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_TABLE:
      return [...statePart, { ...action.payload, id: shortid() }];
    case UPDATE_TABLE:
      return statePart.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    case UPDATE_TABLES:
      return [...action.payload.sort((a, b) => a.id.localeCompare(b.id))];
    case REMOVE_TABLE:
      return statePart.filter((table) => table.id !== action.payload);
    default:
      return statePart;
  }
};

export default tablesReducer;

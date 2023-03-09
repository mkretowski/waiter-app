import shortid from 'shortid';
//selectors
export const getAllTables = (state) => {
  return state.tables;
};
export const getTableById = ({ tables }, tableId) => tables.find((table) => table.id === tableId);
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

export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)));
  };
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_TABLE:
      return [...statePart, { ...action.payload, id: shortid() }];
    case UPDATE_TABLE:
      return statePart.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    case UPDATE_TABLES:
      return [...action.payload];
    case REMOVE_TABLE:
      return statePart.filter((table) => table.id !== action.payload);
    default:
      return statePart;
  }
};

export default tablesReducer;

import shortid from 'shortid';
//selectors
export const getAllTables = (state) => {
  return state.tables;
};
export const getTableById = ({ tables }, tableId) => tables.find((table) => table.id === tableId);
// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const ADD_TABLE = createActionName('ADD_TABLE');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
// action creators
export const addTable = (payload) => ({ type: ADD_TABLE, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });
export const removeTable = (payload) => ({ type: REMOVE_TABLE, payload });
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_TABLE:
      return [...statePart, { ...action.payload, id: shortid() }];
    case EDIT_TABLE:
      return statePart.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    case REMOVE_TABLE:
      return statePart.filter((table) => table.id !== action.payload);
    default:
      return statePart;
  }
};

export default tablesReducer;

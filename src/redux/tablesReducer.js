import { API_URL } from '../config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//selectors
export const getAllTables = (state) => {
  return state.tables.data ? state.tables.data : [];
};
export const getStatus = (state) => {
  return state.tables ? state.tables : state;
};
export const getTableById = ({ tables }, tableId) => tables.data.find((table) => table.id === tableId);
export const getNewId = (state, tablesIds = []) => {
  //get array of all tables ids
  state.tables.data.forEach((table) => {
    tablesIds = [...tablesIds, parseInt(table.id)];
  });
  //return lowest available id number
  return String(tablesIds.sort((a, b) => a - b).reduce((prev, curr) => prev + (prev === curr), 1));
};

export const addTableRequest = createAsyncThunk('tables/addTableRequest', async (newTable) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTable),
  };

  const response = await fetch(API_URL + '/tables', options);
  if (!response.ok) {
    throw new Error('Failed to add table');
  }
});

export const removeTableRequest = createAsyncThunk('tables/removeTableRequest', async (table) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(API_URL + '/tables/' + table, options);
  if (!response.ok) {
    throw new Error('Failed to remove table');
  }
});

export const updateTableRequest = createAsyncThunk('tables/addTableRequest', async (newProperties) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProperties),
  };

  const response = await fetch(API_URL + '/tables/' + newProperties.id, options);
  if (!response.ok) {
    throw new Error('Failed to update table');
  }
});

export const fetchTables = createAsyncThunk('tables/fetchTables', async () => {
  const response = await fetch(API_URL + '/tables');
  const tables = await response.json();
  return tables;
});

const tablesSlice = createSlice({
  name: 'tables',
  initialState: {
    data: [],
    status: 'loading',
  },
  reducers: {
    removeTable(state, action) {
      const tableId = action.payload;
      state.data = state.data.filter((table) => table.id !== tableId);
    },
    addTable(state, action) {
      state.data = [...state.data, { ...action.payload }];
    },
    updateTable(state, action) {
      state.data = state.data.map((table) =>
        table.id === action.payload.id ? { ...table, ...action.payload } : table
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTables.pending, (state) => {
      return [{ status: 'loading' }];
    });
    builder.addCase(fetchTables.fulfilled, (state, action) => {
      return { data: action.payload.sort((a, b) => a.id.localeCompare(b.id)), status: 'idle' };
    });
    builder.addCase(fetchTables.rejected, (state, action) => {
      return [{ status: 'idle' }];
    });
  },
});
export const { removeTable, addTable, updateTable } = tablesSlice.actions;
export default tablesSlice.reducer;

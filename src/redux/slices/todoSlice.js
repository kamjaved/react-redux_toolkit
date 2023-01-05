import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/todos';

const todoAdapter = createEntityAdapter();
const initialState = todoAdapter.getInitialState({
	status: 'idle', //  idle, loading, succeeded, failed
	error: null,
});

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
	const response = await axios.get(URL);
	return response.data;
});

export const addNewTodo = createAsyncThunk('todos/addTodo', async (initialTodo) => {
	const response = await axios.post(URL, initialTodo);
	return response.data;
});

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {},

	extraReducers(builder) {
		///////////////////////////////////
		///--------FETCH TODOD-----------
		////////////////////////////////////

		builder
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.status = 'succeeded';
				todoAdapter.upsertMany(state, action.payload);
			})
			.addCase(fetchTodos.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})

			///////////////////////////////////
			///--------ADD CREATE TODO-----------
			////////////////////////////////////

			.addCase(addNewTodo.fulfilled, (state, action) => {
				action.payload.completed = false;
				action.payload.id = Date.now();

				console.log(action.payload);
				todoAdapter.addOne(state, action.payload);
			});
	},
});

export const {
	selectAll: getAllTodos,
	selectById: getTodosById,
	selectIds: getTodosIds,
} = todoAdapter.getSelectors((state) => state.todos);

export const getTodoError = (state) => state.todos.error;
export const getTodoStatus = (state) => state.todos.status;

export default todoSlice.reducer;

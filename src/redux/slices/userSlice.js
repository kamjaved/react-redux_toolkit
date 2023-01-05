import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/users';

const userAdapter = createEntityAdapter();
const initialState = userAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const users = await axios.get(URL);
	return users.data;
});

const userSlice = createSlice({
	name: 'users',
	initialState,

	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			userAdapter.upsertMany(state, action.payload);
		});
	},
});

// export const getAllUsers = (state) => state.users;
// export const getUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId);

export const { selectAll: getAllUsers, selectById: getUserById } =
	userAdapter.getSelectors((state) => state.users);
export default userSlice.reducer;

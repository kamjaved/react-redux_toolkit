import counterSlice from '../slices/counterSlice';
import postSlice from '../slices/postSlice';
import todoSlice from '../slices/todoSlice';
import userSlice from '../slices/userSlice';

export const rootReducers = {
	count: counterSlice,
	posts: postSlice,
	users: userSlice,
	todos: todoSlice,
};

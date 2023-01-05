import logo from './logo.svg';
import './App.css';
import PostsList from './app/pages/posts/PostsList';
import AddPost from './app/pages/posts/AddPost';
import { store } from './redux/store';
import { fetchUsers } from './redux/slices/userSlice';
import SinglePostPage from './app/pages/posts/SinglePostPage';
import Layout from './app/components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import EditPost from './app/pages/posts/EditPost';
import { fetchPosts } from './redux/slices/postSlice';
import UserPage from './app/pages/users/UserPage';
import UsersList from './app/pages/users/UsersList';
import TodoList from './app/pages/todo/TodoList';
import { fetchTodos } from './redux/slices/todoSlice';
import AddTodo from './app/pages/todo/AddTodo';

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
// store.dispatch(fetchTodos());

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<PostsList />} />
				<Route path="post">
					<Route index element={<AddPost />} />
					<Route path=":postId" element={<SinglePostPage />} />
					<Route path="edit/:postId" element={<EditPost />} />
				</Route>
				<Route path="user">
					<Route index element={<UsersList />} />
					<Route path=":userId" element={<UserPage />} />
				</Route>

				<Route path="todo">
					<Route index element={<TodoList />} />
					<Route path="add" element={<AddTodo />} />
				</Route>

				{/* Catch all - replace with 404 component if you want */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
}

export default App;

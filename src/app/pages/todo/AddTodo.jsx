import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { addNewTodo } from '../../../redux/slices/todoSlice';
import { getAllUsers } from '../../../redux/slices/userSlice';

const AddTodo = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const users = useSelector(getAllUsers);

	const [todoData, setTodoData] = useState({
		title: '',
		userId: '',
	});

	const usersOption = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));

	const handleChange = (e) => {
		setTodoData({ ...todoData, [e.target.name]: e.target.value });
	};

	const onSaveTodoClicked = (e) => {
		e.preventDefault();
		if (canSave) {
			try {
				dispatch(addNewTodo({ title, userId })).unwrap();
				setTodoData({ title: '', userId: '' });
			} catch (error) {
				console.log('Failed to save Todo', error);
			}
		}
		navigate('/todo');
	};

	const { title, userId } = todoData;
	const canSave = Boolean(title) && Boolean(userId);

	return (
		<section>
			<h2>Add a New Todo</h2>
			<form>
				<label htmlFor="user">User</label>
				<select id="user" name="userId" value={userId} onChange={handleChange}>
					<option value=""></option>
					{usersOption}
				</select>
				<label htmlFor="title">Todo Title:</label>
				<input
					type="text"
					id="title"
					name="title"
					value={title}
					onChange={handleChange}
				/>

				<button type="button" onClick={onSaveTodoClicked} disabled={!canSave}>
					Save Todo
				</button>
			</form>
		</section>
	);
};

export default AddTodo;

import { current } from '@reduxjs/toolkit';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	getAllTodos,
	getTodosIds,
	getTodoError,
	getTodoStatus,
	fetchTodos,
} from '../../../redux/slices/todoSlice';
import { getUserById } from '../../../redux/slices/userSlice';
import UserAuthor from '../../components/UserAuthor';

const TodoList = () => {
	const effectRef = useRef(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (effectRef.current === true) {
			if (status === 'idle') {
				dispatch(fetchTodos());
			}
		}
		return () => (effectRef.current = true);
	}, []);

	const todos = useSelector(getAllTodos);
	console.log({ todos });

	const error = useSelector(getTodoError);
	const status = useSelector(getTodoStatus);

	let content;
	if (status === 'loading') {
		content = <p>Loading...</p>;
	} else if (status === 'succeeded') {
		content = todos.map((todo) => (
			<article key={todo.id}>
				<h3>{todo.title}</h3>
				<p>
					Completed:{' '}
					<span className={todo.completed ? 'done' : 'notdone'}>
						{todo.completed ? 'True' : 'False'}
					</span>
				</p>

				<p>
					<UserAuthor userId={todo.userId} />
				</p>
			</article>
		));
	} else if (status === 'failed') {
		content = <p>{error}</p>;
	}

	return (
		<section>
			<span>
				<h2>Todo List</h2>
				<Link to="/todo/add">Add Todo</Link>
			</span>
			{content}
		</section>
	);
};

export default TodoList;

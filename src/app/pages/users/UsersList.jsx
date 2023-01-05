import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { getAllUsers } from '../../../redux/slices/userSlice';

const UsersList = () => {
	const users = useSelector(getAllUsers);
	console.log({ users });

	const renderedUsers = users.map((i) => (
		<li key={i.id}>
			<NavLink to={`/user/${i.id}`}>{i.name}</NavLink>
		</li>
	));

	return (
		<section>
			<h2>Users</h2>
			{renderedUsers}
		</section>
	);
};

export default UsersList;

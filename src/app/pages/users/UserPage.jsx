import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAllPosts, selectPostsByUser } from "../../../redux/slices/postSlice";
import { getUserById } from "../../../redux/slices/userSlice";

const UserPage = () => {
	const { userId } = useParams();
	console.log({ userId });
	const user = useSelector((state) => getUserById(state, Number(userId)));

	// const posts = useSelector(selectAllPosts);
	// const postsOfUser = posts.filter((post) => post.userId === Number(userId));

	const postsOfUser = useSelector((state) => selectPostsByUser(state, Number(userId)));

	const postTitle = postsOfUser.map((item) => (
		<li key={item.id}>
			<Link to={`/post/${item.id}`}>{item.title}</Link>
		</li>
	));

	return (
		<section>
			<h2>{user?.name}</h2>
			<ol>{postTitle}</ol>
		</section>
	);
};

export default UserPage;

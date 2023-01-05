import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPostById } from '../../../redux/slices/postSlice';
import UserAuthor from '../../components/UserAuthor';
import ReactionButtons from '../../components/Reaction';
import TimeAgo from '../../components/TimeAgo';

const PostExcerpt = ({ postId }) => {
	const post = useSelector((state) => getPostById(state, postId));
	return (
		<article>
			<h3>{post.title.substring(0, 25)}</h3>
			<p className="excerpt">{post.body.substring(0, 80)}...</p>
			<p className="postCredit">
				<Link to={`post/${post.id}`}>View Post</Link>
				<UserAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</p>
			<ReactionButtons post={post} />
		</article>
	);
};

// PostExcerpt = React.memo(PostExcerpt); prevent render of all excerpt on each reaction click

export default PostExcerpt;

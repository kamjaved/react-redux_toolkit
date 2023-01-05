import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPostById } from '../../../redux/slices/postSlice';
import PostAuthor from '../../components/UserAuthor';
import ReactionButtons from '../../components/Reaction';
import TimeAgo from '../../components/TimeAgo';

const SinglePostPage = () => {
	const { postId } = useParams();

	console.log({ postId });
	const post = useSelector((state) => getPostById(state, Number(postId)));
	console.log({ post });

	if (!post) {
		return (
			<section>
				<h2>Post Not Found!</h2>
			</section>
		);
	}

	return (
		<article>
			<h2>{post.title}</h2>
			<p>{post.body}</p>
			<p className="postCredit">
				<Link to={`/post/edit/${postId}`}>Edit Post</Link>
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</p>
			<ReactionButtons post={post} />
		</article>
	);
};

export default SinglePostPage;

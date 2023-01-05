import { current } from '@reduxjs/toolkit';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  selectPostIds,
  getPostsError,
  getPostsStatus,
} from '../../../redux/slices/postSlice';

import PostExcerpt from './PostExcerpt';

const PostsList = () => {
  // const effectRef = useRef(false); //DEBUG: in Reactv18 useEffect renderred twice thats why we wree getting posts twice with same key. to get rid we use useRef in useEffect with unmount (return statement inside useEffect)
  // const dispatch = useDispatch();

  const orderedPosts = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  // we are fetching post in app.js file so we don't need fethc post here

  // useEffect(() => {
  //   if (effectRef.current === true) {
  //     if (postsStatus === 'idle') {
  //       dispatch(fetchPosts());
  //     }
  //   }
  //   return () => {
  //     effectRef.current = true;
  //   };
  // }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === 'loading') {
    content = <p>Loading....</p>;
  } else if (postsStatus === 'succeeded') {
    content = orderedPosts.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  console.log({ content });
  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;

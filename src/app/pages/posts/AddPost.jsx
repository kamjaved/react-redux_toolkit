import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from '../../../redux/slices/postSlice';
import { getAllUsers } from '../../../redux/slices/userSlice';

const AddPost = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);

  const [post, setPost] = useState({
    userId: '',
    title: '',
    description: '',
  });

  const [status, setStatus] = useState('idle');

  const { title, description, userId } = post;

  const handleChange = e => {
    e.preventDefault();
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // const canSave = (title) && Boolean(description) && Boolean(userId) --below is the short form or refactored version of this one
  const canSave =
    [title, description, userId].every(Boolean) && status === 'idle';

  const onSavePostClicked = e => {
    e.preventDefault();
    if (canSave) {
      try {
        setStatus('pending');
        dispatch(addNewPost({ title, body: description, userId })).unwrap(); // unwrap is redux toolkit thunk property which let you catch error more info https://redux-toolkit.js.org/api/createAsyncThunk#:~:text=Unwrapping%20Result%20Actions%E2%80%8B&text=The%20thunks%20generated%20by%20createAsyncThunk,action%20object%20inside%2C%20as%20appropriate.
        setPost({ title: '', description: '', userId: '' });
      } catch (error) {
        console.log('Failed to save posts', error);
      } finally {
        setStatus('idle');
      }
    }
  };

  const usersOptions = users.map(i => (
    <option key={i.id} value={i.id}>
      {i.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          name="userId"
          value={userId}
          onChange={handleChange}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPost;

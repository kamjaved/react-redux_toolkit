import {
	createSlice,
	createAsyncThunk,
	createSelector,
	createEntityAdapter,
} from "@reduxjs/toolkit";

import { sub } from "date-fns";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/posts";

const postAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// read more about createEntityAdapter:- https://blog.logrocket.com/building-the-simplest-crud-out-there-with-entity-management/
const initialState = postAdapter.getInitialState({
	status: "idle", // idle, loading, succeeded, failed
	error: null,
	count: 0,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await axios.get(URL);
	return response.data;
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
	const response = await axios.post(URL, initialPost);
	return response.data;
});

export const updatePost = createAsyncThunk("posts/updatePosts", async (initialPost) => {
	const { id } = initialPost;
	try {
		const response = await axios.put(`${URL}/${id}`, initialPost);
		return response.data;
	} catch (error) {
		return initialPost; // only for testing Redux!
	}
});

export const deletePost = createAsyncThunk("posts/deletePosts", async (initialPost) => {
	const { id } = initialPost;
	try {
		const response = await axios.delete(`${URL}/${id}`);
		if (response?.status == 200) return initialPost;
		return `${response?.status}: ${response?.statusText}`;
	} catch (error) {
		return error.message;
	}
});

const postSlice = createSlice({
	name: "posts",
	initialState,

	reducers: {
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.entities[postId];
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},

		increaseCount(state, action) {
			state.count += 1;
		},
	},

	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "loading";
			})

			///////////////////////////////////
			///--------FETCH POSTS-----------
			////////////////////////////////////

			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				// Adding date and reactions
				let min = 1;
				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), { minutes: min++ }).toISOString();
					post.reactions = {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0,
					};
					return post;
				});

				// Add any fetched posts to the array
				// state.posts = state.posts.concat(loadedPosts); replaced a/c to adapter feature
				postAdapter.upsertMany(state, loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})

			///////////////////////////////////
			///------------CREATE ADD-----------
			////////////////////////////////////

			.addCase(addNewPost.fulfilled, (state, action) => {
				// Fix for API post IDs:
				// Creating sortedPosts & assigning the id
				// would be not be needed if the fake API
				// returned accurate new post IDs
				const sortedPosts = state.posts.sort((a, b) => {
					if (a.id > b.id) return 1;
					if (a.id < b.id) return -1;
					return 0;
				});
				action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
				// End fix for fake API post IDs

				action.payload.userId = Number(action.payload.userId);
				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					thumbsUp: 0,
					hooray: 0,
					heart: 0,
					rocket: 0,
					eyes: 0,
				};
				console.log(action.payload);
				postAdapter.addOne(state, action.payload);
			})

			///////////////////////////////////
			///------------UPDATE-----------
			////////////////////////////////////

			.addCase(updatePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Update could not be complete");
					console.log(action.payload);
					return;
				}
				action.payload.date = new Date().toISOString();
				// state.posts = [...remainingPosts, action.payload];
				postAdapter.upsertOne(state, action.payload);
			})

			///////////////////////////////////
			///------------DELETE-----------
			////////////////////////////////////

			.addCase(deletePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Delete could not complete");
					console.log(action.payload);
					return;
				}
				const { id } = action.payload;
				// const posts = state.posts.filter((post) => post.id !== id);
				// state.posts = posts;
				postAdapter.removeOne(state, id);
			});
	},
});

export const { increaseCount, reactionAdded } = postSlice.actions;

// export const selectAllPosts = (state) => state.posts.posts;
// export const getPostById = (state, postId) =>
//  state.posts.posts.find((post) => post.id === postId);

/** NOTE: AS WE ARE USING ENTITY ADAPTER SO ITS AHS OWN Gmethod of getting selector getSelectors 
 * so we dont need to manually write logic of selectors
 below getSelectors creates these selectors and we rename them with aliases using destructuring */

export const {
	selectAll: selectAllPosts,
	selectById: getPostById,
	selectIds: selectPostIds,
	// Pass in a selector that returns the posts slice of state
} = postAdapter.getSelectors((state) => state.posts);

/**
   this create an memoised version in the 1st step we create an dependency array which return userId
   next we filter posts from posts. when ever (posts, usersId) changes then only this memoised version run 
   */
export const selectPostsByUser = createSelector(
	[selectAllPosts, (state, userId) => userId],
	(posts, userId) => posts.filter((post) => post.userId === userId)
);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

export default postSlice.reducer;

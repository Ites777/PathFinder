import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosComment = createAsyncThunk(
  'cards/axiosComment',
  async function(Data, {rejectWithValue}) {
    const {data, id, userId, rating} = Data
    try {
      const response = await axios.post(`http://127.0.0.1:3001/upload/comment/${id}`, {data, userId, rating});
      if (response.statusText !== 'OK') {
        throw new Error('Server Error!')
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const axiosAllComment = createAsyncThunk(
  'cards/axiosComment',
  async function(id, {rejectWithValue}) {
    
    try {
      const response = await axios(`http://127.0.0.1:3001/upload/comment/${id}`);
      if (response.statusText !== 'OK') {
        throw new Error('Server Error!')
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
}

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
      comments: [],
      status: null,
      error: null
  },
  reducers: {

  },
  extraReducers: {
    [axiosComment.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [axiosComment.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.comments.push(action.payload) ;
    },
    [axiosComment.rejected]: setError,
    
    [axiosAllComment.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [axiosAllComment.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.comments = action.payload ;
    },
    [axiosAllComment.rejected]: setError,
  },
});


 
export default commentSlice.reducer;

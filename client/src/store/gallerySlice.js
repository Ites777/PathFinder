import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosGallery = createAsyncThunk(
  'cards/axiosGallery',
  async function(id, {rejectWithValue}) {
    try {
      const response = await axios(`http://127.0.0.1:3001/upload/image/${id}`);
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

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
      photo: [],
      status: null,
      error: null
  },
  reducers: {

    // addCard (state, action) {
    //     state.cards.push(action.payload)
    // },
    // updateCard (state, action) {
    //   state.map((e) => {
    //     if (e.id === id) {
    //       return {
    //         ...e,
    //         todo: res.data.todo,
    //       };
    //     }
    //     return e;
    //   })
    // }

  },
  extraReducers: {
    [axiosGallery.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [axiosGallery.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.photo = action.payload;
    },
    [axiosGallery.rejected]: setError,
  },
});

// export const {addCard} = cardSlice.actions
export default gallerySlice.reducer;

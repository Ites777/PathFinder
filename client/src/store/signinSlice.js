import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signinAxios = createAsyncThunk(
  "auth/signinAxios",
  async function (data, {rejectWithValue}) {
    try {
      const response = await axios.post("/auth/signin", data, {
        withCredentials: true,
      })
      if (response.statusText !== 'OK') {
        throw new Error('Server error!')
      } else {
        
        return response.data
      }

    } catch (error) {
      return rejectWithValue(error.massage)
    }
  }
);

export const signupAxios = createAsyncThunk(
  "auth/signupAxios",
  async function (data, {rejectWithValue}) {
    try {
      const response = await axios.post("/auth/signup", data, {
        withCredentials: true,
      })
      if (response.statusText !== 'OK') {
        throw new Error('Server error!')
      } else {
        return response.data
      }

    } catch (error) {
      return rejectWithValue(error.massage)
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
}

const signinSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    auth: false,
    status: null,
    error: null,
    message: '',
  },
  reducers: {
    logout(state) {
      state.error = null;
      state.user = {}
      state.auth = false
      state.massage = ''
    }
  },

  extraReducers: {
    [signinAxios.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [signinAxios.fulfilled]: (state, action) => {
      state.status = 'resolve';
      if(action.payload.error) {
        state.message = action.payload.error
      } else {
        state.message = ''
        state.user = action.payload;
        state.auth = true
      }
    },
    [signinAxios.rejected]: setError,

    [signupAxios.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [signupAxios.fulfilled]: (state, action) => {
      state.status = 'resolve';
      if(action.payload.error) {
        state.message = action.payload.error
      } else {
        state.user = action.payload;
        state.auth = true
      }
    },
    [signupAxios.rejected]: setError,
  },
});


export default signinSlice.reducer;
export const { logout } = signinSlice.actions

import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

// вываливаем карточки с бэка: 
export const axiosMyCards = createAsyncThunk(
  'myCards/axiosMyCards',
  async function(_, {rejectWithValue}) {
    try {
      const response = await axios.put('http://127.0.0.1:3001/routes/mycards', {userId: localStorage.id});
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

const myCardsSlice = createSlice({
  name: 'myCards',
  initialState: {
    myCards: [],
      status: null,
      error: null
  },
  reducers: {
  addMyCard (state, action) {
      state.myCards.push(action.payload)
  },
  deleteMyCard (state, action) {
    const {
      id
    } = action.payload
       const index = (state.myCards).indexOf(state.myCards.find((e)=>(e.id===id)));
        state.myCards.splice(index, 1)
    },
  updateMyCard (state, action) {
    const {
      title,
      length,
      difficulty,
      address,
      description,
      lat,
      lng,
      id
    } = action.payload
    state.myCards = state.myCards.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          title: title,
          length: length,
          difficulty: difficulty,
          address: address,
          description: description,
          lat: lat,
          lng: lng
         };
      }
      return e;
    })
  },
},
  extraReducers: {
    [axiosMyCards.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [axiosMyCards.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.myCards = action.payload;
    },
    [axiosMyCards.rejected]: setError,
  },
});

export const {addMyCard} = myCardsSlice.actions
export const {updateMyCard} = myCardsSlice.actions
export const {deleteMyCard} = myCardsSlice.actions
export default myCardsSlice.reducer;

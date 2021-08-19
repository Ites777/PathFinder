import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

// вываливаем карточки с бэка: 
export const axiosCards = createAsyncThunk(
  'cards/axiosCards',
  async function(_, {rejectWithValue}) {
    try {
      const response = await axios('http://127.0.0.1:3001/routes');
      if (response.statusText !== 'OK') {
        throw new Error('Server Error!')
      }
      return response.data;// пуляем Routes.findAll() с бэка
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

// хелпер для ошибок 
const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
}

const cardSlice = createSlice({
  name: 'cards',
  initialState: {
      cards: [],
      status: null,
      error: null
  },
  reducers: {

    addCard (state, action) {
        state.cards.push(action.payload)
    },
    deleteCard (state, action) {
      const {
        id
      } = action.payload
         const index = (state.cards).indexOf(state.cards.find((e)=>(e.id===id)));
          state.cards.splice(index, 1)
      },
    updateCard (state, action) {
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
      state.cards = state.cards.map((e) => {
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
    }

  },
  extraReducers: {
    [axiosCards.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [axiosCards.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.cards = action.payload;
    },
    [axiosCards.rejected]: setError,
  },
});

export const {addCard} = cardSlice.actions
export const {updateCard} = cardSlice.actions
export const {deleteCard} = cardSlice.actions
export default cardSlice.reducer;

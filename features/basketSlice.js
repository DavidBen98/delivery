import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      let newBasket = state.items;
      const index = newBasket.findIndex(
        (item) => (item.id === action.payload.id)
      );

      if (index >= 0){
        newBasket.splice(index,1);
      } 
      state.items = newBasket;
    },
    removeAllFromBasket: (state, payload) => {
      state.items = [];
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, removeAllFromBasket } = basketSlice.actions

export const selectBasketItems = state => state.basket.items;

export const selectBasketItemsWithId = (state, id) => 
    state.basket.items.filter(item => item.id === id)

export const selectBasketTotal = (state) => state.basket.items.reduce((total,item) => total += item.price,0)

export default basketSlice.reducer
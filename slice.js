import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const itemIdRemove = action.payload.id;
      return state.filter((item) => item.id !== itemIdRemove);
    }
  }
})


//Store
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  }
})
console.log("onCreate Store :", store.getState());

//subscribe
store.subscribe(() => {
  console.log("STORE CHANGE :", store.getState());
})

store.dispatch(cartSlice.actions.addToCart({ id: 1, qty: 20 }));
store.dispatch(cartSlice.actions.removeFromCart({ id: 1 }));
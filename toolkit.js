import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";



// Multi Reducer ada Add dan Remove
const addToCart = createAction("ADD_TO_CART");
const removeFromCart = createAction("REMOVE_FROM_CART");

const cartReducer = createReducer([], (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      state.push(action.payload)
    })
    .addCase(removeFromCart, (state, action) => {
      const itemIdRemove = action.payload.id;
      return state.filter((item) => item.id !== itemIdRemove);
    });
});

//Reducer Yang berbeda
const login = createAction("CREATE_SESSION");
const loginReducer = createReducer({ status: false }, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.status = true;
    })
})


//Store
const store = configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer
  }
})
console.log("onCreate Store :", store.getState());



//subscribe
store.subscribe(() => {
  console.log("STORE CHANGE :", store.getState());
})

// store.dispatch(login());
store.dispatch(addToCart({ id: 1, qty: 20 }));
// store.dispatch(addToCart({ id: 2, qty: 7 }));
store.dispatch(removeFromCart({ id: 1 }));
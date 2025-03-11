import { configureStore } from "@reduxjs/toolkit";
import  rootReducer  from "./RootReduce";
import { loadState, saveState } from "./LocalStorage";

const preloadedState = loadState(); // Load persisted state from localStorage

const store = configureStore({
    reducer:rootReducer,
    preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
  });


export default store
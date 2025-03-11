import { combineReducers, createSlice } from "@reduxjs/toolkit";
import CartSlice from "./slices/CartSlice";
import TodoBoardsSlice from "./slices/TodoBoardsSlice";
import AuthSlice from "./slices/AuthSlice";

const rootReducer = combineReducers({
    cart: CartSlice,
    auth: AuthSlice,
    todoBoards: TodoBoardsSlice
});

export default rootReducer;
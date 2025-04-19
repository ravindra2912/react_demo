import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            return state = action.payload;
            // const { product_id, quantity } = action.payload;

            // // Find the existing product in the cart
            // const product = state.find((item) => item.product_id === product_id);

            // if (product) {
            //     // Update the quantity directly
            //     product.quantity = quantity;
            // } else {
            //     // Add new product
            //     state.push(action.payload);
            // }
        },
        removeFromCart(state, action) {
            return state.filter((item) => item.id !== action.payload.id);
        },
        emptyFromCart(state, action) {
            return state = [];
        }
    }
});

export const { addToCart, removeFromCart, emptyFromCart } = CartSlice.actions;
export default CartSlice.reducer;
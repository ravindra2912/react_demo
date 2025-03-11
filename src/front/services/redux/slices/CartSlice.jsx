import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const { product_id, quantity } = action.payload;

            // Find the existing product in the cart
            const product = state.find((item) => item.product_id === product_id);

            if (product) {
                // Update the quantity directly
                product.quantity = quantity;
            } else {
                // Add new product
                state.push(action.payload);
            }
        },
        removeFromCart(state, action) {
            return state.filter((item) => item.product_id !== action.payload.id);
        }
    }
});

export const { addToCart, removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        loginReq(state, action) {
            return state = ({
                token: action.payload.token,
                info: { name: action.payload.name, email: action.payload.email, image: action.payload.image }
            });
        },
        LogoutReq(state, action) {
            return state = {};
        },
        Register(state, action) {
            // console.log("Current State:", JSON.stringify(state, null, 2));
            const user = state.find((item) => item.email === action.payload.email);
            if (user) {
                user.push({
                    email: action.payload.email,
                    password: action.payload.password,
                    name: action.payload.name
                });
            }
        },
        Update(state, action) {
            console.log("Update User's info");
            const user = state.find((item) => item.email === action.payload.email);
            if (user) {
                Object.assign(user, {
                    email: action.payload.email,
                    password: action.payload.password,
                    name: action.payload.name
                });
            }
        },
    }
});

export const { loginReq, LogoutReq } = AuthSlice.actions;
export default AuthSlice.reducer;
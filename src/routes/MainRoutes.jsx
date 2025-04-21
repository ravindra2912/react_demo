import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../front/home/Home";
import Main from "../front/Layout/Main";
import Products from "../front/products/Products";
import ProductDetails from "../front/products/ProductDetails";
import PageWith404Handler from "../front/Layout/PageWith404Handler";
import ProductImageZoom from "../front/products/ProductImageZoom";
import Cart from '../front/cart/Cart';
import Todo from "../todo/index";
import Razorpay from "../front/cart/Razorpay";
import Login from "../front/auth/Login";
import CheckAuth from "../front/Layout/CheckAuth";
import ContactUs from "../front/ContactUs";
import Faq from "../front/Faq";
import AboutUs from "../front/AboutUs";
import Profile from "../front/account/Profile";
import OrderList from "../front/account/orders/OrderList";
import AccountLayout from "../front/account/AccountLayout";
import Checkout from "../front/cart/Checkout";
import OrderDetails from "../front/account/orders/OrderDetails";
import WishList from "../front/account/WishList";




function MainRoutes() {



    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Main />} >
                    <Route element={<CheckAuth />} >

                        <Route path="cart" element={<Cart />} />
                        <Route path="checkout" element={<Checkout />} />
                        <Route path="/razorpay/payment" element={<Razorpay />} />

                        <Route element={<AccountLayout />} >
                            <Route path="/account/profile" element={<Profile />} />
                            <Route path="/account/orders" element={<OrderList />} />
                            <Route path="/account/order/:id" element={<OrderDetails />} />
                            <Route path="/account/wishlist" element={<WishList />} />
                        </Route>
                    </Route>

                    <Route path="" element={<Home />} />
                    <Route path="products" element={<Products />} />
                    {/* <Route path="product/:slug" element={<ProductImageZoom />} /> */}
                    <Route path="product/:slug" element={<ProductDetails />} />

                    {/* auth */}
                    <Route path="about-us" element={<AboutUs />} />
                    <Route path="faq" element={<Faq />} />
                    <Route path="contactus" element={<ContactUs />} />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<PageWith404Handler />} />
                </Route>
                <Route path="todo" element={<Todo />} />

            </Routes>
        </BrowserRouter>
    );
}



export default MainRoutes;
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosReq from "../AxiosReq";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../services/redux/slices/CartSlice";


function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate(); // Initialize navigation
    const [cartData, setCartData] = useState(Array);
    const [loading, setLoading] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        console.log(cart);
        getCartData();
    }, [cart])

   async function removeItem(id) {
        await dispatch(removeFromCart({'id': id}));
    }


     function getCartData(){
        if (cart.length > 0) {
            setCartData(cart);
            var subtotals = 0;
            var totals = 0;
            cart.map((item) => {
                subtotals = subtotals + (item.price * item.quantity)
                totals = totals + (item.price * item.quantity)
            })
            setSubtotal(Math.round(subtotals * 100) / 100);
            setTotal(Math.round(totals * 100) / 100);
        }else{
            setCartData([]);
            setSubtotal(0);
            setTotal(0);
        }
     }   

    async function getCart() {
        window.scrollTo(0, 0);
        await AxiosReq(`carts/28`, '', 'GET', navigate)
            // await AxiosReq(`carts/user/5`, '', 'GET', navigate)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    setCartData(response.data);
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                setLoading(false);
            });
    }

    return (

        <>
            <section className="container mb-3 cart">
                <div className="row">
                    {
                        (cartData && cartData.length > 0) || loading ? <>

                            <div className="col-md-8 col-12">
                                <h3>Cart</h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartData.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img className="pimg" src={item.thumbnail} />
                                                            {item.title}
                                                        </td>
                                                        <td>${item.price}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>${item.price * item.quantity}</td>
                                                        <td><i className="bi bi-trash text-danger border border-danger rounded py-1 px-2" title="Remove" onClick={(e)=>removeItem(item.product_id)}></i></td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>

                            <div className="col-md-4 col-12">
                                <h3>Cart Summary</h3>
                                <hr />
                                <div className="form-group">
                                    <label htmlFor="coupon">Coupon Code</label>
                                    <input type="text" className="form-control" id="coupon" />
                                </div>
                                <button className="btn btn-primary mt-2">Apply Coupon</button>
                                <hr />
                                <h4>Cart Total</h4>
                                <hr />
                                <table className="table table-secondary border">
                                    <thead>
                                        <tr>
                                            <th>Subtotal</th>
                                            <th>${subtotal}</th>
                                        </tr>
                                        <tr>
                                            <th>Discount</th>
                                            <th>${discount}</th>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <th>${total}</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="col-12 text-end">
                                <Link to="/products" className="btn btn-primary me-2">Continue Shopping</Link>
                                <Link to="/razorpay/payment" className="btn btn-primary me-2">Pay</Link>
                                {/* <button className="btn btn-primary me-2">Pay</button> */}
                                {/* <button className="btn btn-primary">Checkout</button> */}
                            </div>
                        </> : loading ? <h1>loading ...</h1> : <h1>Cart is empty</h1>
                    }

                </div>
            </section>

        </>
    )
}

export default Cart;
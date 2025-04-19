import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosReq from "../AxiosReq";
import { useDispatch, useSelector } from "react-redux";
import { emptyFromCart, removeFromCart } from "../services/redux/slices/CartSlice";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";


function Checkout() {
    var token = useSelector((state) => state.auth.token);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate(); // Initialize navigation
    const [cartData, setCartData] = useState(Array);
    const [loading, setLoading] = useState(false);

    const [placeOrderLoading, setplaceOrderLoading] = useState(false);

    useEffect(() => {
        console.log(cart);
        getCartData();
    }, [cart])

    async function getCartData() {
        window.scrollTo(0, 0);
        setLoading(true);
        await AxiosReq(`cart_list`, '', 'POST', navigate, token)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    setCartData(response.data);
                } else {
                    toast.error(response.message)
                }
            })
            .catch((error) => {
                toast.error('Somthing wron while add to cart')
                console.log(error);

            }).finally(() => {
                setLoading(false)
            });
    }

    function showCartListLoader() {
        var indents = [];
        for (var i = 1; i <= 4; i++) {
            indents.push(
                <tr key={'cart-' + i}>
                    <td colSpan={5} className="p-0" style={{ border: 'unset' }} >
                        <Skeleton height={40} />
                    </td>
                </tr>
            )
        }
        return indents;
    }

    async function placeOrder() {
        let postdata = {
            "name": document.getElementById('name').value,
            "contact": document.getElementById('contact').value,
            // "email": document.getElementById('email').value,
            "address": document.getElementById('address').value,
            "country": document.getElementById('state').value,
            "state": document.getElementById('state').value,
            "city": document.getElementById('city').value,
            "zipcode": document.getElementById('pincode').value,
            "payment_type": 1
        }

        setplaceOrderLoading(true)
        await AxiosReq(`place_order`, postdata, 'POST', navigate, token)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    dispatch(emptyFromCart())
                    toast.success(response.message)
                    navigate('/razorpay/payment', { state: { order_id: response.data.id, amount: response.data.total } })
                } else {
                    toast.error(response.message)
                }
            })
            .catch((error) => {
                toast.error('Somthing wron while add to cart')
                console.log(error);

            }).finally(() => {
                setplaceOrderLoading(false)
            });
    }

    return (

        <>
            <section className="container mb-3 cart">
                <div className="row">
                    {
                        (cartData && cartData?.cart?.length > 0) || loading ? <>

                            <div className="col-md-8 col-12">
                                <h3>Address</h3>
                                <hr />
                                <div className="row" >
                                    <div className="form-group col-md-6 col-12 mt-2">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Your name" />
                                    </div>

                                    <div className="form-group col-md-6 col-12 mt-3">
                                        <label htmlFor="contact">Contact</label>
                                        <input type="text" className="form-control" id="contact" name="contact" placeholder="Your contact" />
                                    </div>

                                    <div className="form-group col-md-6 col-12 mt-3">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Your email" />
                                    </div>

                                    <div className="form-group col-12 mt-3">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" className="form-control" id="address" name="address" placeholder="Your Address" />
                                    </div>

                                    <div className="form-group col-md-6 col-12 mt-3">
                                        <label htmlFor="country">Country</label>
                                        <input type="text" className="form-control" id="country" value='india' readOnly={true} name="country" placeholder="Country" />
                                    </div>

                                    <div className="form-group col-md-6 col-12 mt-3">
                                        <label htmlFor="state">State</label>
                                        <input type="text" className="form-control" id="state" name="state" placeholder="State" />
                                    </div>

                                    <div className="form-group col-md-6 col-12 mt-3">
                                        <label htmlFor="city">City</label>
                                        <input type="text" className="form-control" id="city" name="city" placeholder="City" />
                                    </div>

                                    <div className="form-group col-md-6 col-12 mt-3">
                                        <label htmlFor="pincode">Pincode</label>
                                        <input type="text" className="form-control" id="pincode" name="pincode" placeholder="Pincode" />
                                    </div>
                                </div>

                            </div>

                            <div className="col-md-4 col-12">
                                {/* <h3>Cart Summary</h3>
                                <hr />
                                <div className="form-group">
                                    <label htmlFor="coupon">Coupon Code</label>
                                    <input type="text" className="form-control" id="coupon" />
                                </div>
                                <button className="btn btn-primary mt-2">Apply Coupon</button>
                                <hr /> */}
                                <h3>Items</h3>
                                <hr />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>item</th>
                                            <th>Price</th>
                                            <th>QTY</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loading ? showCartListLoader() :
                                                (
                                                    cartData?.cart?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <img className="pimg" src={item.product_data?.imageurl} />
                                                                    {item.product_data?.name}
                                                                </td>
                                                                <td>&#8377;{item.product_data?.price}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>&#8377;{item.product_data?.price * item.quantity}</td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                        }

                                    </tbody>
                                </table>
                                <h4>Cart Total</h4>
                                <hr />
                                {
                                    cartData?.cart?.length > 0 ?

                                        <table className="table table-secondary border">
                                            <thead>
                                                <tr>
                                                    <th>Subtotal</th>
                                                    <th>&#8377;{cartData.summary?.subtotle}</th>
                                                </tr>
                                                <tr>
                                                    <th>Discount</th>
                                                    <th>&#8377;{cartData.summary?.discount}</th>
                                                </tr>
                                                <tr>
                                                    <th>Total</th>
                                                    <th>&#8377;{cartData.summary?.totle}</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        : ''
                                }
                            </div>
                            <div className="col-12 text-end">
                                <Link to="/products" className="btn btn-primary me-2">Continue Shopping</Link>
                                <button className="btn btn-primary me-2" disabled={placeOrderLoading} onClick={()=>placeOrder()}>{ placeOrderLoading ? 'Placing ...':'Place order' }</button>
                                {/* <Link to="/razorpay/payment" className="btn btn-primary me-2">Pay</Link> */}
                            </div>
                        </> : loading ? <h1>loading ...</h1> : <div className="mt-3 d-flex justify-content-center align-items-center text-dark">
                            <h1 className="fw-bold">🛒 Cart is Empty</h1>
                        </div>
                    }

                </div>
            </section>

        </>
    )
}

export default Checkout;
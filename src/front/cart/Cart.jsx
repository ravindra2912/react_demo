import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosReq from "../AxiosReq";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../services/redux/slices/CartSlice";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";


function Cart() {
    var token = useSelector((state) => state.auth.token);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate(); // Initialize navigation
    const [cartData, setCartData] = useState(Array);
    const [loading, setLoading] = useState(false);

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

    async function removeItem(cart_id) {
        setLoading(true);
        await AxiosReq(`remove_from_cart`, { 'cart_id': cart_id }, 'POST', navigate, token)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    toast.success(response.message)
                    dispatch(removeFromCart({ 'id': cart_id }));
                    getCartData();
                } else {
                    toast.error(response.message)
                }
            })
            .catch((error) => {
                toast.error('Somthing wron while remove to cart')
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

    return (

        <>
            <section className="container mb-3 cart">
                <div className="row">
                    {
                        (cartData && cartData?.cart?.length > 0) || loading ? <>

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
                                                                <td><i className="bi bi-trash text-danger border border-danger rounded py-1 px-2" title="Remove" onClick={(e) => removeItem(item.id)}></i></td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                        }

                                    </tbody>
                                </table>
                            </div>
                            {
                                !loading ?
                                    (
                                        <>
                                            <div className="col-md-4 col-12">
                                                <h3>Cart Total</h3>
                                                <hr />
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
                                            </div>
                                            <div className="col-12 text-end">
                                                <Link to="/products" className="btn btn-primary me-2">Continue Shopping</Link>
                                                <Link to="/Checkout" className="btn btn-primary me-2">Checkout</Link>
                                            </div>
                                        </>
                                    )
                                    : ''
                            }

                        </> : loading ? <h1>loading ...</h1> : <div className="mt-3 d-flex justify-content-center align-items-center text-dark">
                            <h1 className="fw-bold">🛒 Cart is Empty</h1>
                        </div>
                    }

                </div>
            </section>

        </>
    )
}

export default Cart;
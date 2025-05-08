import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosReq from "../../AxiosReq";

function OrderDetails() {
    var { id } = useParams();
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate(); // Initialize navigation
    let [loading, setLoading] = useState(true)
    let [order, setOrder] = useState()

    useEffect(() => {
        getOrder()
    }, [])

    async function getOrder() {
        setLoading(true);
        await AxiosReq(`order_details`, { order_id: id }, 'POST', navigate, token)
            .then((response) => {
                // console.log(response);
                if (response.success) {
                    setOrder(response.data)
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
            <div className="card-header bg-primary text-white">
                <h5 className="card-title">Order #{order ? order.id : ''}</h5>
            </div>

            {
                loading ? <h2 className="text-center my-5 py-5">Loading ...</h2> :
                    order ? (
                        <div className="row p-2">
                            <div className="col-md-6 col-12 mt-2 ">
                                <div className="card border-0 p-1">
                                    <div className="card-header">
                                        <h4 className="card-title">Order info</h4>
                                    </div>

                                    <div className="card-body">
                                        <div className="row">
                                            <p className="col-5 fw-bold text-end mb-0">Order id : </p>
                                            <p className="col-7 mb-0 fw-bold"> #{order ? order.id : ''} </p>
                                        </div>
                                        <div className="row">
                                            <p className="col-5 fw-bold text-end mb-0">Order status : </p>
                                            <p className="col-7 mb-0"> {order ? order.order_status_name : ''} </p>
                                        </div>
                                        <div className="row">
                                            <p className="col-5 fw-bold text-end mb-0">Payment status : </p>
                                            <p className="col-7 mb-0"> {order ? order.payment_status == 1 ? "Paid" : "Pending" : ''} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-12 mt-2 ">
                                <div className="card border-0  p-1">
                                    <div className="card-header">
                                        <h4 className="card-title">Shiping address</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <p className="col-4 fw-bold text-end mb-0">Name : </p>
                                            <p className="col-8 mb-0"> {order ? order.name : ''} </p>
                                        </div>
                                        <div className="row">
                                            <p className="col-4 fw-bold text-end mb-0">Contact : </p>
                                            <p className="col-8 mb-0"> {order ? order.contact : ''} </p>
                                        </div>
                                        <div className="row">
                                            <p className="col-4 fw-bold text-end mb-0">Address : </p>
                                            <p className="col-8 mb-0"> {order ? order.address : ''} </p>
                                        </div>
                                        <div className="row">
                                            <p className="col-4 fw-bold text-end mb-0">Address2 : </p>
                                            <p className="col-8 mb-0"> {order ? order.address2 : ''} </p>
                                        </div>
                                        <div className="row">
                                            <p className="col-4 fw-bold text-end mb-0">Country : </p>
                                            <p className="col-8 mb-0"> {order ? order.country : ''} </p>
                                        </div>
                                        <div className="row">
                                            <p className="col-4 fw-bold text-end mb-0">State : </p>
                                            <p className="col-8 mb-0"> {order ? order.state : ''} </p>
                                        </div>
                                        <div className="row">
                                            <p className="col-4 fw-bold text-end mb-0">City : </p>
                                            <p className="col-8 mb-0"> {order ? order.city : ''} </p>
                                        </div>
                                        <div className="row">
                                            <p className="col-4 fw-bold text-end mb-0">zipcode : </p>
                                            <p className="col-8 mb-0"> {order ? order.zipcode : ''} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8 col-12 mt-2 ">
                                <div className="card border-0 p-1">
                                    <div className="card-header">
                                        <h4 className="card-title">item</h4>
                                    </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Price</th>
                                                <th>QTY</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order?.order_items_data?.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <img height="90" src={item?.order_items_data?.imageurl} />
                                                                {item.product_name}
                                                            </td>
                                                            <td>&#8377;{item.product_price}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>&#8377;{item.product_price * item.quantity}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col-md-4 col-12 mt-2 ">
                                <div className="card border-0 p-1">
                                    <div className="card-header">
                                        <h4 className="card-title">Summary</h4>
                                    </div>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="text-end fw-bold">Sub Total : </td>
                                                <td>&#8377;{order ? order.subtotal : ''} </td>
                                            </tr>
                                            <tr>
                                                <td className="text-end fw-bold">Discount : </td>
                                                <td>&#8377;{order ? order.discount : ''} </td>
                                            </tr>
                                            <tr>
                                                <td className="text-end fw-bold">Tax : </td>
                                                <td>&#8377;{order ? order.tax : ''} </td>
                                            </tr>
                                            <tr>
                                                <td className="text-end fw-bold">Shipping : </td>
                                                <td>&#8377;{order ? order.shipping : ''} </td>
                                            </tr>
                                            <tr>
                                                <td className="text-end fw-bold">Total : </td>
                                                <td>&#8377;{order ? order.total : ''} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    ) : <h2 className="text-center my-5 py-5">Order not found</h2>
            }
        </>
    )
}

export default OrderDetails;
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AxiosReq from "../../AxiosReq";

function OrderList() {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate(); // Initialize navigation
    let [loading, setLoading] = useState(true)
    let [limit, setLimit] = useState(12);
    let [skip, setSkip] = useState(0);
    let [orders, setOrders] = useState([])
    let [noMoreOrders, setNoMoreOrders] = useState(false)

    useEffect(() => {
        // const timer = setTimeout(() => {
        //     console.log('Function called after 3 seconds');
        //     SetLoading(false)
        // }, 3000); // 3000ms = 3 seconds

        // // Cleanup the timer when the component unmounts
        // return () => clearTimeout(timer);

        getOrders()
    }, [])

    async function getOrders() {
        setLoading(true);
        var data = {
            offset: skip,
            limite: limit
        }
        await AxiosReq(`order_list`, data, 'POST', navigate, token)
            .then((response) => {
                // console.log(response);
                if (response.success) {
                    setOrders([...orders, ...response.data])
                    if (response.data == [] || response.data.length < limit) {
                        setNoMoreOrders(true);
                    }
                    setSkip((pre) => pre + limit)
                }
            })
            .catch((error) => {
                console.log(error);

            }).finally(() => {
                setLoading(false);
            });
    }

    function ShowLoader() {
        var indents = [];
        for (var i = 1; i <= 3; i++) {
            indents.push(
                <div className="row rounded" key={'order-' + i}>
                    <Skeleton height={40} />
                </div>
            )
        }
        return indents;
    }
    return (
        <>
            <div className="card-header bg-primary text-white">
                <h5 className="card-title">Orders</h5>
            </div>
            <div className="card-body">

                <div className="order-list">
                    <div className="row text-center order-header">
                        <div className="col-4">Order ID</div>
                        <div className="col-2">date</div>
                        <div className="col-2">Payment</div>
                        <div className="col-2">Amount</div>
                        <div className="col-2">status</div>
                    </div>

                    {
                        loading ? <ShowLoader /> :
                            orders.length > 0 ?
                                orders.map((order, index) => {
                                    return (
                                        <Link to={'/account/order/'+order.id} className="row text-center order-box py-2 rounded mt-2" key={'order-' + index}>
                                            <div className="col-4">#{order.id}</div>
                                            <div className="col-2">{order.order_date}</div>
                                            <div className="col-2">{order.payment_status}</div>
                                            <div className="col-2">&#8377;{order.total}</div>
                                            <div className="col-2">{order.order_status_name}</div>
                                        </Link>
                                    )
                                })
                                : <p className="text-center">Order Not found</p>
                    }
                </div>
            </div>

        </>
    )
}

export default OrderList;
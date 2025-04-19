import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import logo from '../../assets/logo.png';

function Razorpay() {
    const location = useLocation();

    let[orderid , setOrderid] = React.useState('')
    let[amount, setAmont] = React.useState('')
    let[orderNotFound, setOrderNotFound] = React.useState(false)

    useEffect(()=>{
        const { order_id, amount } = location.state || {};
        if(order_id && amount){
            setOrderid(order_id)
            setAmont(amount)
        }else{
            setOrderNotFound(true)
        }
        console.log(order_id, amount)
    },[])


    const LoadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const displayRazorpay = async () => {
        const res = await LoadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        var data = {
            amount: 5000,
            currency: 'INR',
            receipt: 'order_rcptid_'+orderid,
            payment_capture: '1',
            id: orderid
        }

        console.log(data)

        const options = {
            // key: 'rzp_test_1DP5mmOlF5G5ag',
            key: import.meta.env.VITE_RAZORPAY_KEY,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: 'Donation',
            description: 'Thank you for nothing. Please give us some money',
            image: logo,
            handler: function (response) {
                console.log(response)
                toast.success('Payment Success. '+ response.razorpay_payment_id);
                // alert(response.razorpay_payment_id)
                // alert(response.razorpay_order_id)
                // alert(response.razorpay_signature)
            },
            prefill: {
                name: 'Gaurav Kumar',
                email: 'test@gmail.com',
                contact: '9999999999'
            },
            notes: {
                address: 'Razorpay Corporate Office'
            },
            theme: {
                color: '#3399cc'
            }
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }



    return <>
        <div className="container">
            <div className="row text-center">
                <div className="col-md-6 offset-md-3">
                    <h2>Payment Gateway</h2>
                    <button className="btn btn-primary" onClick={displayRazorpay}>Pay Now</button>
                </div>
            </div>
        </div>
    </>;
    }

export default Razorpay;
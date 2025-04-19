import React, { useEffect, useState } from "react";
import GoogleAuth from "./GoogleAuth";
import { useDispatch, useSelector } from "react-redux";
import { loginReq } from "../services/redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import AxiosReq from "../AxiosReq";
import toast from "react-hot-toast";

function Login() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    let [email, setEmail] = useState('goswamirvi@gmail.com');
    let [password, setPassword] = useState('password');

    useEffect(() => {
        // if (auth.token) {
        //     navigate("/");
        // }
    }, []);

    function loginUser(res) {
        dispatch(loginReq(res));
        toast.success("Login Successful!");
        navigate("/");
    }

    async function loginWithPassword(){
        var data = {
            email: email,
            password: password
        }
        await AxiosReq(`login`, data, 'POST', navigate)
                    .then((response) => {
                        // console.log(response.data);
                        if (response.success) {
                            var res = {
                                token: response.data.accessToken,
                                name: response.data.first_name + ' ' + response.data.last_name,
                                email: response.data.email,
                                image: response.data.image,
                              };
                              loginUser(res);
                            console.log(res);
                        } else {
                            toast.error(response.message);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
        
                    }).finally(() => {
                        // setLoading(false);
                    });

        // var res = {
        //     token: credentialResponse.clientId,
        //     name: user.name,
        //     email: user.email,
        //     image: user.picture,
        //   };
    }
    return (
        <>
            <section className="my-5 login">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <GoogleAuth loginUser={loginUser} />
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>

                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Email</label>
                                    <input type="email" id="form3Example3" 
                                        defaultValue={email}
                                        onChange={(e)=> setEmail(e.target.value)}
                                        className="form-control form-control-lg"
                                        placeholder="Enter email" /> 
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                    <input type="password" id="form3Example4" 
                                        defaultValue={password}
                                        onChange={(e)=> setPassword(e.target.value)}
                                        className="form-control form-control-lg"
                                        placeholder="Enter password" />
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <!-- Checkbox --> */}
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" onClick={()=>loginWithPassword()} data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
                                    >Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                                        className="link-danger">Register</a></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}

export default Login;
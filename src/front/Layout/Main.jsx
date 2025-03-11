import React from "react";
import { Outlet } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css'
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap JS
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./Header";
import Footer from "./Footer";
import { ToastBar, Toaster } from 'react-hot-toast';
import '../../index.css'

export default function Main() {

    return (
        <>

            <Header />
            <div className="content mt-5 pt-5">
                <Outlet />

                {/* <Toaster position="bottom-center" */}
                <Toaster 
                position="bottom-center"
                // position="top-right"
                    toastOptions={{
                        success: {
                            style: {
                                border: '1px solid green',
                                backgroundColor: 'green',
                                color: 'white'
                            },
                        },
                        error: {
                            style: {
                                background: 'red',
                                color: 'white'
                            },
                        },
                    }}
                >
                    {(t) => (
                        <ToastBar
                            toast={t}
                            style={{
                                ...t.style,
                                animation: t.visible ? 'custom-enter 10s ease' : 'custom-exit 10s ease',
                            }}
                        />
                    )}
                </Toaster>

            </div>
            <Footer />

        </>
    )
}
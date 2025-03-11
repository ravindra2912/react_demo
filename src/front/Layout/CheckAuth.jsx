import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function CheckAuth() {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!auth.token) {
            navigate("/login");
        }
    }, [auth])

    return (
        <Outlet />
    )

}
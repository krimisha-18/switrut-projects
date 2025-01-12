import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux"; // Correct hook for dispatching actions
import { useSelector } from "react-redux";

const Login = () => {
    const [data, setData] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Correctly use the `useDispatch` hook
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLoggedIn === true) {
        navigate("/");
    }
    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const submit = async () => {
        try {
            if (data.username === "" || data.password === "") {
                alert("All Fields Are Required");
            } else {
                const response = await axios.post(
                    "http://localhost:1000/api/v1/log-in",
                    data
                );
                setData({ username: "", password: "" });
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);
                dispatch(authActions.Login());
                navigate("/"); // Navigate to the desired route
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="h-[98vh] flex items-center justify-center">
            <div className="p-4 w-2/6 rounded bg-gray-800">
                <div className="text-2xl font-semibold">LogIn</div>
                <input
                    type="text"
                    placeholder="Username"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="username"
                    onChange={change}
                    value={data.username}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="password"
                    onChange={change}
                    value={data.password}
                />
                <div className="w-full flex items-center justify-between">
                    <button
                        className="bg-blue-400 text-xl text-black px-3 py-2 rounded"
                        onClick={submit}
                    >
                        Login
                    </button>
                    <Link to={"/signup"} className="text-gray-400 hover:text-gray-200">
                        Not Having an Account? Sign Up here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

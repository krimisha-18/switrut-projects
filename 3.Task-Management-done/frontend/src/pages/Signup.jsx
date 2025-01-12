import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Signup = () => {
    const history = useNavigate();
    
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if (isLoggedIn === true) {
        history("/");
    }

    const [data, setData] = useState({ username: "", email: "", password: "" });
    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const submit = async () => {
        try {
            if (data.username === "" || data.email === "" || data.password === "") {
                alert("All Fields Are Required");
            } else {
                const response = await axios.post(
                    "http://localhost:1000/api/v1/sign-in", // Corrected URL
                    data
                );
                setData({ username: "", email: "", password: "" });
                console.log(response);
                history("/login");
            }
        } catch (error) {
            alert(error.response?.data || "An error occurred");
        }
    };

    return (
        <div className="h-[98vh] flex items-center justify-center">
            <div className="p-4 w-3/6 rounded bg-gray-800">
                <div className="text-2xl font-semibold">SignUp</div>
                <input
                    type="text"
                    placeholder="UserName"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="username" // Corrected name
                    onChange={change}
                    value={data.username} // Corrected state key
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="email" // Corrected name
                    onChange={change}
                    value={data.email} // Corrected state key
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="password" // Corrected name
                    onChange={change}
                    value={data.password} // Corrected state key
                />
                <div className="w-full flex items-center justify-between">
                    <button
                        className="bg-blue-400 text-xl text-black px-3 py-2 rounded"
                        onClick={submit}
                    >
                        SignUp
                    </button>
                    <Link
                        to={"/login"}
                        className="text-gray-400 hover:text-gray-200"
                    >
                        Already Having an Account? Login here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setRoleVar }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = () => {
        axios.post('http://localhost:3001/auth/login', { username, password, role })
            .then(res => {
                console.log(res.data); // Log to confirm response structure
                if (res.data.login) {
                    if (res.data.role === 'admin') {
                        setRoleVar('admin');
                        navigate('/dashbord');
                    } else if (res.data.role === 'student') {
                        setRoleVar('student');
                        navigate('/');
                    }
                } else {
                    console.error("Invalid login credentials");
                    alert("Invalid login credentials");
                }
            })
            .catch(err => {
                console.error("Error during login:", err);
                alert("Login failed. Please try again.");
            });
    };



    return (
        <div className=" mx-auto p-9 flex items-center justify-center">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter Your Name"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter Your Password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="role" className="block text-gray-700 font-medium mb-2">Role</label>
                    <select
                        name="role"
                        id="role"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="admin">Admin</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                <button
                    className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition duration-300"
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
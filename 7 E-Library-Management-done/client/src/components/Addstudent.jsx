import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const AddStudent = () => {
    const [roll, setRoll] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [grade, setGrade] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/student/register", { roll, username, password, grade })
            .then(res => {
                if(res.data.registered){
                    navigate('/dashbord')
                }
                console.log(res)
                
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="max-w-md bg-slate-100 mx-auto p-4 mt-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="roll" className="block text-sm font-medium text-gray-700">Roll No</label>
                    <input
                        type="text"
                        id="roll"
                        name="roll"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setRoll(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">User Name</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade</label>
                    <input
                        type="text"
                        id="grade"
                        name="grade"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setGrade(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;

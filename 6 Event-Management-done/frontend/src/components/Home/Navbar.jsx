import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Data, setData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const data = [
        {
            title: "All Event",
            icon: <CgNotes />,
            link: "/",
        },
       
        {
            title: "Completed Event",
            icon: <FaCheckDouble />,
            link: "Completedtasks",
        },
        {
            title: "Incompleted Event",
            icon: <TbNotebookOff />,
            link: "Incompletedtasks",
        },
    ];

    const logout = () => {
        dispatch(authActions.logout());
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/signup");
    };

    useEffect(() => {
        // Check login status
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        // Fetch user data if logged in
        if (token) {
            const fetch = async () => {
                try {
                    const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", {
                        headers: {
                            id: localStorage.getItem("id"),
                        },
                    });
                    setData(response.data.data);
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            };
            fetch();
        }
    }, []);

    return (
        <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
            </div>
            
            <div className="flex items-center gap-6">
                {data.map((item, i) => (
                    <Link
                        to={item.link}
                        key={i}
                        className="flex items-center p-2 rounded-xl border-2 border-gray-300 gap-2 text-lg text-gray-700 hover:bg-gray-300">
                        <div>{item.icon}</div>
                        <div>{item.title}</div>
                    </Link>

                ))}
            </div>
            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={logout}>
                        Log Out
                    </button>
                ) : (
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => navigate("/login")}>
                        Log In
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;

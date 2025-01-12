import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaCheckDouble } from "react-icons/fa6";
import { MdLabelImportant } from "react-icons/md";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Data, setData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const data = [
        {
            title: "All Tasks",
            icon: <CgNotes />,
            link: "/",
        },
        {
            title: "Important Tasks",
            icon: <MdLabelImportant />,
            link: "Importanttasks",
        },
        {
            title: "Completed Tasks",
            icon: <FaCheckDouble />,
            link: "Completedtasks",
        },
        {
            title: "Incompleted Tasks",
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
        <>
            {isLoggedIn && Data?.username && (
                <div className="flex flex-wrap">
                    <h2 className="text-xl font-semibold ">Welcome {Data.username}</h2>
                
                    
                </div>
            )}
            <div className="my-2 flex flex-wrap gap-3">
                {data.map((item, i) => (
                    <Link
                        to={item.link}
                        key={i}
                        className="flex items-center gap-2 p-2 w-full border border-gray-300 rounded-lg shadow-sm hover:shadow-md">
                        <div>{item.icon}</div>
                        <div>{item.title}</div>
                    </Link>
                ))}
            </div>
            <div>
                {isLoggedIn ? (
                    <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>
                        Log Out
                    </button>
                ) : (
                    <button
                        className="bg-blue-600 w-full p-2 rounded"
                        onClick={() => navigate("/login")}>
                        Log In
                    </button>
                )}
            </div>
        </>
    );
};

export default Sidebar;

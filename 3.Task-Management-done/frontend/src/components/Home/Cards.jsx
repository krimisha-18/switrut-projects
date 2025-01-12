import axios from "axios";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

const Cards = ({ home, setInputDiv, data, setUpdateData }) => {
    const headers = {
        id: localStorage.getItem("id") || "default-id",
    };

    const handleCompleteTasks = async (id) => {
        try {
            await axios.put(`http://localhost:1000/api/v2/update-complete-tasks/${id}`, {}, { headers });
        } catch (error) {
            console.log(error);
        }
    };


    const importe = async (id) => {
        try {
            await axios.put(`http://localhost:1000/api/v2/update-imp-tasks/${id}`, {}, { headers });
        } catch (error) {
            console.log(error);
        }
    };


    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:1000/api/v2/delete-tasks/${id}`, { headers });
        } catch (error) {
            console.log(error);
        }
    };


    const handleEdit = async (id, title, desc) => {
        setInputDiv("fixed");
        setUpdateData({ id, title, desc });
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {data &&
                data.map((item, i) => (
                    <div key={i} className="flex flex-col bg-gray-800 rounded-sm p-4">
                        <div>
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className="text-gray-300 my-2">{item.desc}</p>
                        </div>

                        <div className="mt-4 w-full flex items-center justify-between space-x-4">
                            <button
                                className={`${item.complete === false ? "bg-red-400" : "bg-green-700"} p-2 rounded w-3/6`}
                                onClick={() => handleCompleteTasks(item._id)}>
                                {item.complete === true ? "Completed" : "In Completed"}
                            </button>

                            <div className="flex items-center text-gray-200 text-xl space-x-3">

                                <button onClick={() => importe(item._id)}>
                                    {item.important ? <FaHeart className="text-red-500" /> : <CiHeart />}
                                </button>

                                {home !== "false" && (
                                    <button onClick={() => handleEdit(item._id, item.title, item.desc)}>
                                        <FaEdit />
                                    </button>
                                )}

                                <button onClick={() => deleteTask(item._id)}>
                                    <MdDelete />
                                </button>

                            </div>
                        </div>
                    </div>
                ))}

            {home === "true" && (
                <button
                    className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
                    onClick={() => setInputDiv("fixed")}
                >
                    <IoIosAddCircle className="text-5xl" />
                    <h2 className="text-2xl mt-4">Add Task</h2>
                </button>
            )}
        </div>
    );
};

export default Cards;

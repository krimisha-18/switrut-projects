import axios from "axios";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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

    const handleEdit = async (id, title, desc, date, location, maxAttendees, imgUrl) => {
        setInputDiv("fixed");
        setUpdateData({ id, title, desc, date, location, maxAttendees, imgUrl }); // Include imgUrl
    };

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {data &&
                data.map((item, i) => (
                    <div key={i} className="flex flex-col bg-gray-800 rounded-sm p-4">
                        <div>
                            {item.imgUrl && (
                                <img
                                    src={item.imgUrl}
                                    alt={item.title}
                                    className="w-full h-40 object-cover rounded-sm mb-3"
                                />
                            )}
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className="text-gray-300 my-2">{item.desc}</p>
                            
                            <p className="text-gray-400 text-sm">Location : {item.location}</p>
                            <p className="text-gray-400 text-sm">Date : {new Date(item.date).toLocaleDateString()}</p>
                            
                            {item.maxAttendees && (
                                <p className="text-gray-400 text-sm">Max Attendees: {item.maxAttendees}</p>
                            )}
                        </div>

                        <div className="mt-4 w-full flex items-center justify-between space-x-4">
                            
                            <button
                                className={`${item.complete === false ? "bg-red-400" : "bg-green-700"} p-2 rounded w-3/9 text-sm`}
                                onClick={() => handleCompleteTasks(item._id)}
                            >
                                {item.complete === true ? "Completed" : "In Completed"}
                            </button>

                            <div className="flex items-center text-gray-200 text-xl space-x-3">
                                {home !== "false" && (
                                    <button
                                        onClick={() =>
                                            handleEdit(
                                                item._id,
                                                item.title,
                                                item.desc,
                                                item.date,
                                                item.location,
                                                item.maxAttendees,
                                                item.imgUrl // Pass imgUrl to the edit handler
                                            )
                                        }
                                    >
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
        </div>
    );
};

export default Cards;

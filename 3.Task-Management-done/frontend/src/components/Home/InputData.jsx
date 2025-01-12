import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";

const InputData = ({ inputDiv, setInputDiv, uapUdateData = { id: "", title: "", desc: "" }, setUpdateData }) => {
    const [data, setData] = useState({ title: "", desc: "" });

    useEffect(() => {
        setData({
            title: uapUdateData?.title || "",
            desc: uapUdateData?.desc || "",
        });
    }, [uapUdateData]);

    const headers = {
        id: localStorage.getItem("id"),
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const submitData = async () => {
        if (data.title === "" || data.desc === "") {
            alert("All fields are required");
        } else {
            try {
                await axios.post("http://localhost:1000/api/v2/create-task", data, { headers });
                setData({ title: "", desc: "" });
                setInputDiv("hidden");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const UpdateTask = async () => {
        if (data.title === "" || data.desc === "") {
            alert("All fields are required");
        } else {
            try {
                await axios.put(`http://localhost:1000/api/v2/update-tasks/${uapUdateData.id}`, data, { headers });
                setUpdateData({ id: "", title: "", desc: "" });
                setData({ title: "", desc: "" });
                setInputDiv("hidden");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className={`${inputDiv === "hidden" ? "hidden" : "fixed"} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}></div>
            <div className={`${inputDiv === "hidden" ? "hidden" : "fixed"} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className="w-2/6 bg-gray-900 p-4 rounded">
                    <div className="flex justify-end">
                        <button
                            className="text-2xl items-end"
                            onClick={() => {
                                setInputDiv("hidden");
                                setData({ title: "", desc: "" });
                                setUpdateData({ id: "", title: "", desc: "" });
                            }}
                        >
                            <IoClose />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        className="px-3 py-2 rounded w-full bg-gray-700 my-3"
                        value={data.title}
                        onChange={change}
                    />
                    <textarea
                        name="desc"
                        cols="30"
                        rows="10"
                        placeholder="Description..."
                        className="px-3 py-2 rounded w-full bg-gray-700 my-3"
                        value={data.desc}
                        onChange={change}
                    ></textarea>
                    {uapUdateData.id === "" ? (
                        <button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold" onClick={submitData}>
                            Submit
                        </button>
                    ) : (
                        <button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold" onClick={UpdateTask}>
                            Update
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

InputData.propTypes = {
    inputDiv: PropTypes.string.isRequired,
    setInputDiv: PropTypes.func.isRequired,
    uapUdateData: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        desc: PropTypes.string,
    }),
    setUpdateData: PropTypes.func.isRequired,
};

export default InputData;

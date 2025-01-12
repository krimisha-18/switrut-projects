import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import { IoIosAddCircle } from "react-icons/io";
import InputData from "../components/Home/InputData";
import axios from "axios";

const Alltasks = () => {
    const [inputDiv, setInputDiv] = useState("hidden");
    const [Data, setData] = useState([]);
    const [uapUdateData, setUpdateData] = useState({ id: "", title: "", desc: "" })

    const headers = {
        id: localStorage.getItem("id"),
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
                setData(response.data.data); // Safely handle tasks array
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetch();
    });

    return (
        <>
            <div>
                <div className="w-full flex justify-end px-4 py-2">
                    <button onClick={() => setInputDiv("fixed")}>
                        <IoIosAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
                    </button>
                </div>
                {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} setUpdateData={setUpdateData} />}
            </div>
            <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} uapUdateData={uapUdateData} setUpdateData={setUpdateData} />
        </>
    );
};

export default Alltasks;

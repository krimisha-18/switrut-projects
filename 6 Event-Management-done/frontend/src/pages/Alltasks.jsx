import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import InputData from "../components/Home/InputData";
import axios from "axios";

const Alltasks = () => {
    const [inputDiv, setInputDiv] = useState("hidden");
    const [Data, setData] = useState([]);
    const [uapUdateData, setUpdateData] = useState({
        id: "",
        title: "",
        desc: "",
        date: "",
        location: "",
        maxAttendees: "",
        imgUrl: "", // Include imgUrl in the state
    });

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
                    <button
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                        onClick={() => setInputDiv("fixed")}
                    >
                        Add Event
                    </button>
                </div>

                {Data && (
                    <Cards
                        home={"true"}
                        setInputDiv={setInputDiv}
                        data={Data.tasks}
                        setUpdateData={setUpdateData}
                    />
                )}
            </div>
            <InputData
                inputDiv={inputDiv}
                setInputDiv={setInputDiv}
                uapUdateData={uapUdateData}
                setUpdateData={setUpdateData}
            />
        </>
    );
};

export default Alltasks;

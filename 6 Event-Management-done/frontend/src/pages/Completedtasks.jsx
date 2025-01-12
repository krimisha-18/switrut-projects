import React, {useEffect, useState} from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const Completedtasks = () => {
    const [Data, setData] = useState([]);
    const headers = {
      id: localStorage.getItem("id"),
    };
  
    useEffect(() => {
      const fetch = async () => {
          const response = await axios.get("http://localhost:1000/api/v2/get-complete-tasks", { headers });
          setData(response.data.data);
        }
      fetch();
    }); 
  
    return (
      <div>
        {Data && Data.length > 0 ? (
          <Cards home={"false"} data={Data} />
        ) : (
          <p className="text-3xl text-gray-800 flex mx-auto justify-center items-center mt-52">Not Available</p>
        )}
      </div>
    );
  };

export default Completedtasks;
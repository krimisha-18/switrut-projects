import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";

const Importanttasks = () => {
  const [Data, setData] = useState([]);
  const [error, setError] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v2/get-important-tasks", { headers });
        setData(response.data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }); 

  return (
    <div>
      {Data && Data.length > 0 ? (
        <Cards home={"false"} data={Data} />
      ) : (
        <p>Not Available</p>
      )}
    </div>
  );
  
};

export default Importanttasks;


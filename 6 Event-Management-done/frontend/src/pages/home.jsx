import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Home/Navbar";

const Home = () => {
    return(
        <div className="">
                <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Home
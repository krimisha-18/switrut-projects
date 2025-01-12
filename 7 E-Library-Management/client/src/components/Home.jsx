import axios from "axios";
import React, { useEffect } from "react";

const Home = () => {
    
    return (
        <div className="bg-gray-100 h-screen flex flex-col md:flex-row items-center justify-between p-6 space-y-6 md:space-y-0 md:space-x-8">
            <div className="text-center md:text-left max-w-md">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Shop</h1>
                <p className="text-lg text-gray-600">
                    Browse the collection of our best top interesting books. <br />
                    You will definitely find what you are looking for.
                </p>
            </div>
            <div className="w-full md:w-1/2">
                <img
                    src="https://images.pexels.com/photos/29122599/pexels-photo-29122599/free-photo-of-cozy-bookstore-hideaway-in-delhi-india.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Bookshelf"
                    className="rounded-lg shadow-lg w-full"
                />
            </div>
        </div>
    )
}
export default Home
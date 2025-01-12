import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ role }) => {
    return (
        <nav className="bg-blue-500 p-4 flex justify-between items-center">
            <div className="text-white font-bold text-xl">
                <Link to="/">Book Store</Link>
            </div>
            <div className="flex space-x-4">
                <Link to="/books" className="text-white hover:text-gray-200 transition duration-300">
                    Books
                </Link>

                {role === "admin" && <>

                    <Link to="/addbook" className="text-white hover:text-gray-200 transition duration-300">
                        Add Books
                    </Link>

                    <Link to="/addstudent" className="text-white hover:text-gray-200 transition duration-300">
                        Add Student
                    </Link>

                    <Link to="/dashbord" className="text-white hover:text-gray-200 transition duration-300">
                        Dashbord
                    </Link>

                    

                </>}

                {role === "" ? (
                    <Link to="/login" className="text-white hover:text-gray-200 transition duration-300">
                        Login
                    </Link>
                ) : (
                    <Link to="/logout" className="text-white hover:text-gray-200 transition duration-300">
                        Logout
                    </Link>
                )}

            </div>
        </nav>

    )
}
export default Navbar
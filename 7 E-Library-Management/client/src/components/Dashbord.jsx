import React, { useEffect, useState } from "react";
import axios from 'axios'

const Dashbord = () => {
    const [students, setStudent] = useState(0)
    const [book, setBook] = useState(0)
    const [admin, setAdmin] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:3001/dashbord')
        .then(res => {
            if(res.data.ok){
                setAdmin(res.data.admin)
                setBook(res.data.book)
                setStudent(res.data.student)
            }
        }).catch(err => console.log(err))
    }, [])

    return (
        <div className="max-w-4xl mx-auto p-6  rounded-lg">
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-white shadow-md rounded-md text-center">
                    <h2 className="text-lg font-bold text-gray-700">Total Books</h2>
                    <h2>{book}</h2>
                </div>
                <div className="p-4 bg-white shadow-md rounded-md text-center">
                    <h2 className="text-lg font-bold text-gray-700">Total Students</h2>
                    <h2>{students}</h2>
                </div>
                <div className="p-4 bg-white shadow-md rounded-md text-center">
                    <h2 className="text-lg font-bold text-gray-700">Total Admins</h2>
                    <h2>{admin}</h2>
                </div>
            </div>

        </div>

    )
}

export default Dashbord;
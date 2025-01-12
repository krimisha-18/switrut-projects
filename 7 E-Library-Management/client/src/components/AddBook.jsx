import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const AddBook = () => {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/book/add", { name, author, imageUrl })
            .then(res => {
               if(res.data.added){
                navigate('/books')
               }else{
                console.log(res)
               }        
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="max-w-md bg-slate-100 mx-auto p-4 mt-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add Books</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="book" className="block text-sm font-medium text-gray-700">Book Name</label>
                    <input
                        type="text"
                        id="book"
                        name="book"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author Name</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;


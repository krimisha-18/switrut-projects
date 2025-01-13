import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom"

const EditBook = () => {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        axios.get("http://localhost:3001/book/book/" + id)
        .then(res => {
            setName(res.data.name)
            setAuthor(res.data.author)
            setImageUrl(res.data.imageUrl)
            
        })
        .catch(err => console.log(err));
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/book/book/" + id, { name, author, imageUrl })
            .then(res => {
               if(res.data.updated){
                navigate('/books')
               }else{
                console.log(res)
               }        
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="max-w-md bg-slate-100 mx-auto p-4 mt-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Books</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="book" className="block text-sm font-medium text-gray-700">Book Name</label>
                    <input
                        type="text"
                        id="book"
                        name="book"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author Name</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Update Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBook;


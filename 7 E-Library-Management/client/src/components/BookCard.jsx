import React from "react";
import { Link } from "react-router-dom"

const BookCard = ({ book, role }) => {
  const { name, author, imageUrl } = book;
  return (
    <div>
      <div className="pt-5">
        <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="mt-4">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-600">{author}</p>
          </div>

          {role === "admin" &&
            <div className="mt-4 flex justify-between items-center space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                <Link to={`/book/${book._id}`}>Edit</Link>
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                <Link to={`/delete/${book._id}`}>Delete</Link>
              </button>
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default BookCard
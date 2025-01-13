import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/book/books")
      .then((res) => {
        setBooks(res.data);
        console.log(res.data)
      }).catch(err => console.log(err))
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book, index) => (
          <BookCard key={book.id || index} book={book} role={role} />
        ))}
      </div>
    </div>

  );
};

export default Books;

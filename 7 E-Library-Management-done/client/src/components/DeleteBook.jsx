import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
    const navigator = useNavigate();
    const {id} = useParams()
    
    useEffect(() => {
        axios.delete('http://localhost:3001/book/book/' +id)
        .then(res => {
            if(res.data.deleted){
                navigator('/books')
            }
        }).catch(err => console.log(err))
    }, [])
}

export default DeleteBook;
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({setRole}) => {
    const navigator = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3001/auth/logout')
        .then(res => {
            if(res.data.logout){
                setRole('')
                navigator('/')
            }
        }).catch(err => console.log(err))
    },[])
}

export default Logout
import React, { useEffect } from "react";
import Home from "./pages/home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Alltasks from "./pages/Alltasks";
import Completedtasks from "./pages/Completedtasks";
import Incompletedtasks from "./pages/Incompletedtasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useDispatch } from "react-redux"; 

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.Login());
    }else if (!isLoggedIn === false) {
      navigate("/signup");
    }
  });

  return (
    <div className="bg-gray-400 text-white h-screen relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<Alltasks />} />
          <Route path="/Completedtasks" element={<Completedtasks />} />
          <Route path="/Incompletedtasks" element={<Incompletedtasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;

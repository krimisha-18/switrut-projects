import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Books from './components/Books'
import Login from './components/Login'
import Dashbord from './components/Dashbord'
import Addstudent from './components/Addstudent'
import { useEffect, useState } from 'react'
import Logout from './components/Logout'
import axios from 'axios'
import AddBook from './components/AddBook'
import EditBook from './components/EditBook'
import DeleteBook from './components/DeleteBook'


function App() {
  const [role, setRole] = useState('')

  axios.defaults.withCredentials = true;
  
  useEffect(() => {
      axios.get('http://localhost:3001/auth/verify')
          .then(res => {
              if (res.data.login) {
                  setRole(res.data.role); // Update state correctly
              } else {
                  setRole(''); // Reset state if not logged in
              }
              console.log(res)
          })
          .catch(err => console.log(err));
  }, []);

  return (
    <BrowserRouter>
    <Navbar role={role}/>
      <Routes>
        <Route path = '/' element = {<Home/>}></Route>
        <Route path = '/books' element = {<Books role={role}/>}></Route>
        <Route path = '/login' element = {<Login setRoleVar={setRole}/>}></Route>
        <Route path = '/dashbord' element = {<Dashbord/>}></Route>
        <Route path = '/addstudent' element = {<Addstudent/>}></Route>
        <Route path = '/addbook' element = {<AddBook/>}></Route>
        <Route path = '/logout' element = {<Logout setRole={setRole}/>}></Route>
        <Route path = '/book/:id' element = {<EditBook/>}></Route>
        <Route path = '/delete/:id' element = {<DeleteBook/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App   
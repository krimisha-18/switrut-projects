import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Admins } from "../models/Admin.model.js";
import { Students } from "../models/Student.model.js";

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (role === 'admin') {
            const admin = await Admins.findOne({ username });
            if (!admin) {
                return res.json({ message: "Admin not registered" });
            }

            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.json({ message: "Wrong password" });
            }

            const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_Key);
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'admin' });

        } else if (role === 'student') {

            const student = await Students.findOne({ username });
            if (!student) {
                return res.json({ message: "Student not registered" });
            }

            const validPassword = await bcrypt.compare(password, student.password);
            if (!validPassword) {
                return res.json({ message: "Wrong password" });
            }

            const token = jwt.sign({ username: student.username, role: 'student' }, process.env.Student_Key);
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'student' });
            
        } else {
            return res.json({ message: "Invalid role" });
        }
    } catch (err) {
        res.json(err);
    }
});

const verifyAdmin = (req , res , next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({message: "Invelid Admin"})
    }else{
        jwt.verify(token , process.env.Admin_Key, (err , decode) => {
            if(err){
                return res.json({message: "Invelid Admin"})
            }else {
                req.username = decode.username;
                req.role = decode.role;
                next();
            }
        })
    }
}




const verifyUser = (req , res , next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({message: "Invelid user"})
    }else{
        jwt.verify(token , process.env.Admin_Key, (err , decode) => {
            if(err){
                jwt.verify(token , process.env.Student_Key, (err , decode) => {
                    if(err){
                        return res.json({message: "Invelid Admin"})
                    }else {
                        req.username = decode.username;
                        req.role = decode.role;
                        next();
                    }
                })
            }else {
                req.username = decode.username;
                req.role = decode.role;
                next();
            }
        })
    }
}




router.get('/verify',verifyUser, (req , res) => {
    return res.json({login: true, role: req.role})
})


router.get('/logout', (req , res) => {
    res.clearCookie('token')
    return res.json({logout : true})
})

export { router as AdminRouter , verifyAdmin};
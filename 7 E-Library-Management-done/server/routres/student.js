import express from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Students } from "../models/Student.model.js";
import { verifyAdmin } from "./auth.js";

const router = express.Router();

router.post('/register',verifyAdmin, async (req , res) => {
    try {
        const { username, password, roll, grade } = req.body;
        const student = await Students.findOne({username})
        if(student){
            return res.json({message : "student is Registered"})
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const newstudent = new Students({
            username,
            password:hashpassword,
            roll:roll,
            grade
        })
        await newstudent.save()
        return res.json({registered: true})
    } catch (err) {
        return res.json({message : "Error Student"})
    }
})

export{router as studentRouter}
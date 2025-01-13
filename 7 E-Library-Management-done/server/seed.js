import express from "express";
import bcrypt from "bcrypt";
import './db.js'; 
import {Admins} from "./models/Admin.model.js"


const app = express();

async function AdminAccount() {
  try {
    const adminCount = await Admins.countDocuments();
    if (adminCount === 0) {
      const hashPassword = await bcrypt.hash("123", 10);
      const newAdmin = new Admins({
        username: "krimisha",
        password: hashPassword
      });
      await newAdmin.save();
      console.log("Account Created");
    } else {
      console.log("Account Already Exists");
    }
  } catch (err) {
    console.log("error");
  }
}

AdminAccount();
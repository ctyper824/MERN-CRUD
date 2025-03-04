import jwt from "jsonwebtoken"
import User from "../models/User.js";

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)
        console.log(password)
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ id: email }, process.env.JWT_SECRET);
            res.status(200).json({ token, admin: email });
        } else {
            return res.status(400).json({ error: "Invalid credentials! Try again" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (users) {
            res.status(200).json({ users });
        } else {
            return res.status(400).json({ error: "User's Data Not Available" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
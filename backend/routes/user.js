const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { lstat } = require("fs");
const { loadavg } = require("os");

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6),
})

router.post("/signup", async (req,res) => {
    const validation = signupBody.safeParse(req.body);
    if(!validation.success){
        return res.status(411).json({
            message: "Validation error / Incorrect Inputs",
            error: validation.error,
        })
    }

    const response = validation.data;
    const username = response.username;
    const password = response.password;

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            "message" : "Email already exists"
        })
    }

    const user = await User.create({
        username: response.username,
        password: response.password,
        firstName: response.firstName,
        lastName: response.lastName,
    })
    const userId = user._id; //made by the database itself

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        "message" : "User Created successfully",
        token: token
    })

})



const router = express.Router();

module.exports = router;
const express = require("express");
const zod = require("zod");
const bcrypt = require("bcrypt")
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

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
        username: username,
    })

    if(existingUser){
        return res.status(411).json({
            "message" : "Email already exists"
        })
    }

    const hashed_password = await bcrypt.hash(password);

    const user = await User.create({
        username: response.username,
        password: hashed_password,
        firstName: response.firstName,
        lastName: response.lastName,
    })
    const userId = user._id; //made by the database itself

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        "message" : "User Created successfully",
        token: token
    })

})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async(req,res) => {
    const validation = signinBody.safeParse(req.body);
    if(!validation.success){
        return res.status(411).json({
            message: "Validation error / Incorrect Inputs",
            error: validation.error,
        })
    }

    const response = validation.data;
    const username = response.username;
    const password = response.password;

    const User = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if (User.username !== username){
        return res.status(500).json({
            "msg" : "Incorrect Username"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
        return res.status(500).json({
            "msg" : "Incorrect password"
        })
    }


    const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

    res.json({
            "msg" : "User sign in successful",
            "token" : "Bearer" + " " + token
        })
        return;
})

const updateBody = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().min(3).optional(),
    lastName: zod.string().optional()
})

router.put("/", authMiddleware, async(req,res) => {
    const { success } = zod.safeParse(req.body)
    if (!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    try{
        await User.updateOne({_id: req.userId},req.body);
    }
    catch(error){
        res.status(500).json({
            message: "Error in updating the information",
            error: error.message
        })
    }
})

// route to get all the users that exist in Db currently
router.get("/bulk", async(req,res) => {
    const filter = req.query.filter || "";
    //This accesses the filter property of the query object.
   //If the URL contains a query parameter named filter (e.g., /bulk?filter=john),
   //req.query.filter will hold the value of this parameter ('john' in this case).

   // if req,query is a falsy value or undefined then const filter will give a empty string
   /*Query Parameter Provided:
Request URL: /bulk?filter=john
req.query: { filter: 'john' }
req.query.filter: 'john'
filter: 'john' (since req.query.filter is truthy)
Query Parameter Not Provided:

Request URL: /bulk
req.query: {}
req.query.filter: undefined
filter: "" (since req.query.filter is falsy, the default value "" is used)
}) */

     const user = await User.find({
        $or: [
            {
                firstName: {"$regex":filter}  // regex is used to match the substring.
            },
            {
                lastName: {"$regex":filter}
            }
        ]
     })
     res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
     })
})
module.exports = router;
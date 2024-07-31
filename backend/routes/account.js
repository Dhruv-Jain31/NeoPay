const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require ("../db")
const router = express.Router();

router.get("/balance", authMiddleware, async (req,res) => {
    const account = await Account.findOne({
        userId: req.userId,
    });

    res.json({
        balance: account.balance,
    })
})

router.post("/transfer", authMiddleware, async (req,res) => {
    const session = await mongoose.startSession(); // means we are doing bunch of things together
    //in the database and if any one fails, revert everything

    session.startTransaction();
    const { amount, receiver } = req.body;

    //fetch the accounts within the transaction
    const account = await Account.findOne({
        userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        });
    }

    const toAccount = await Account.findOne({
        userId: receiver,
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    //performing the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount} }).session(session);
    await Account.updateOne({ userId: receiver }, { $inc: { balance: amount} }).session(session);

    //commit the transaction
    await session.commitTransaction();
    res.json({
        message: `Transfer of ${amount} successful`
    })
})
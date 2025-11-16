import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import UserAuthMiddleWare from "./UserAuthMiddle.js"
import { Account, Users } from '../db.js';
import mongoose from 'mongoose';
import { GetToken } from '../Util.js';


const AccountRouter = express.Router();

AccountRouter.use(UserAuthMiddleWare);

AccountRouter.get("/balance",async(req,res)=>{
    const Auth = req.headers.authorization;
    const token = GetToken(Auth);
    const userId = jwt.verify(token,process?.env?.JWT_SECRETE)?.userId;
    console.log(userId);
    
    const User = await Account.findOne({userId:userId});
    console.log(User)
    if(!User){
        res.status(404).json({
            message: "User Not Found",
        })
    }
    res.status(200).json({
        balance: User?.balance
    })
})


export default AccountRouter;


// AccountRouter.post("/transfer",async(req,res)=>{
//     const token = GetToken(req.headers.authorization);
//     const userId = jwt.verify(token,process?.env.JWT_SECRETE)?.userId;

//     const To = req.body.ToId;
//     const Amount = req.body.Amount;
//     if(!To || !Amount){
//         res.send("Please fill all the values");
//     }

//     const User = await Users.findOne({_id:To});
//     if(!User){
//         res.send("Not A Valid User to Transfer money");
//         return;
//     }

//     const session = await mongoose.startSession();

// try {
//     session.startTransaction();

//   const userBalance = await Account.findOne({ userId:userId }).session(session);

//   if (!userBalance || userBalance.balance < Amount) {
//         await session.abortTransaction();
//     session.endSession();
//     return res.send("Insufficient Balance");
//     }

//   await Account.updateOne(
//     { userId:userId },
//     { $inc: { balance: -Amount } }
//   ).session(session);

//   await Account.updateOne(
//     { userId: To },
//     { $inc: { balance: Amount } }
//   ).session(session);

//     await session.commitTransaction();
//   session.endSession();
//   return res.send("Transfer Successful");

// } catch(err) {
//   await session.abortTransaction();
//   session.endSession();
//   console.error(err);
//   return res.status(500).send("Transaction failed");
// }
// })


AccountRouter.post("/transfer",async(req,res)=>{
    const token = GetToken(req.headers.authorization);
    const userId = jwt.verify(token,process?.env.JWT_SECRETE)?.userId;

    const To = req.body.ToId;
    const Amount = req.body.Amount;
    if(!To || !Amount){
        res.send("Please fill all the values");
    }

    const User = await Users.findOne({_id:To});
    if(!User){
        res.send("Not A Valid User to Transfer money");
        return;
    }

try {

  const userBalance = await Account.findOne({ userId:userId });

  if (!userBalance || userBalance.balance < Amount) {
    return res.send("Insufficient Balance");
    }

  await Account.updateOne(
    { userId:userId },
    { $inc: { balance: -Amount } }
  );

  await Account.updateOne(
    { userId: To },
    { $inc: { balance: Amount } }
  );
  return res.send("Transfer Successful");

} catch(err) {
  console.error(err);
  return res.status(500).send("Transaction failed");
}
})

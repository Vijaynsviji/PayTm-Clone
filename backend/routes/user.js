
import express from 'express';
import {Account, Users} from "../db.js";
import UserAuthMiddleWare from "./UserAuthMiddle.js"
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { GetToken } from '../Util.js';


const UserRouter  = express.Router();

UserRouter.post("/signup",async (req,res)=>{
    const UserJson = req.body;
    if(UserJson?.userName){
        const user = await Users.findOne({userName:UserJson?.userName});
        if(user){
            res.send("UserName Already Exits, Please SignIn");
        }
    }
    const User = await Users.create({
        firstName: UserJson?.firstName,
        secondName: UserJson?.secondName,
        userName: UserJson?.userName,
        password: UserJson?.password,
    })
    await Account.create({
        userId: User?._id,
        balance: Math.random() * 1000,
    })
    res.send("Sign up Success");
})

UserRouter.post("/signin",async (req,res)=>{
    const {userName,password} = req.body;
    console.log(userName);
    const user = await Users.findOne({"userName":userName});
    console.log(user);
    if(user){
        if(user?.password==password){
            console.log(process?.env.JWT_SECRETE);
            const token = jwt.sign({userId:user?._id},process?.env.JWT_SECRETE);
            res.status(200).json({
                code: 200,
                message: "Sign in Success",
                data: {
                    token: token,
                }
            });
            return;
        }else{
            res.status(404).json({
                message: "Please Enter valid Password"});
            return;
        }
    }

    res.status(404).json({message: "UserName not found, Please Register"})
})

UserRouter.use(UserAuthMiddleWare);

UserRouter.post("/updateInfo/:userName", async(req,res)=>{
    const userName = req.params?.userName;
    const updateDataJson = req.body;
    console.log(userName,updateDataJson);
    const UpdateObj = await Users.updateOne({"userName":userName},updateDataJson);

    if(UpdateObj?.modifiedCount==0){
        res.send("Update is UnSuccessfull");
        return;
    }
    res.send("Update Successfull");
})

UserRouter.get("/verifyUser",async(req,res)=>{
    try{
        const userToken = GetToken(req?.headers.authorization);
        const userJson = jwt.verify(userToken,process?.env.JWT_SECRETE);
        const user = await Users.findOne({_id:userJson?.userId});
        const account = await Account.findOne({userId:user?._id});
        return res.status(200).json({
            userData: {
                firstName: user?.firstName,
                secondName: user?.secondName,
                userName: user?.userName,
                userId: user?._id,
                balance: account?.balance
            }
        })
    }catch(e){
        console.log(e);
    }
})

UserRouter.get("/bulk", async (req,res)=>{
    const filter = req?.query?.filter;
    const users = await Users?.find({
        $or:[
            {
                firstName:{
                    "$regex": filter
                }
            },{
                secondName:{
                    "$regex": filter
                }
            }
        ]
    })

    console.log(users);

    res.status(200).json({
        user: users.map(item=>(
        {
        firstName: item?.firstName,
        secondName: item?.secondName,
        userName: item?.userName,
        id: item?._id
        })
        )
    })
})

export default UserRouter;
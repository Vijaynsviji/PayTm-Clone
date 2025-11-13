
import express from 'express';
import Users from "../db.js";
import UserAuthMiddleWare from "./UserAuthMiddle.js"
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const UserRouter  = express.Router();




UserRouter.post("/signup",async (req,res)=>{
    const UserJson = req.body;
    if(UserJson?.userName){
        const user = await Users.findOne({userName:UserJson?.userName});
        if(user){
            res.send("UserName Already Exits, Please SignIn");
        }
    }
    await Users.create({
        firstName: UserJson?.firstName,
        secondName: UserJson?.secondName,
        userName: UserJson?.userName,
        password: UserJson?.password,
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
            const token = jwt.sign({userName:user?.userName},process?.env.JWT_SECRETE);
            res.status(200).json({
                code: 200,
                message: "Sign in Success",
                data: {
                    token: token,
                }
            });
            return;
        }else{
            res.send("Please Enter valid Password");
            return;
        }
    }

    res.send("UserName not found, Please Register")
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

export default UserRouter;
import { Link, useNavigate } from "react-router-dom";
import InputComp from "../Utils/InputComp";
import { useState } from "react";
import axios from "axios";
import { SiteUrl } from "../Utils/SiteData";


const SignUp = ()=>{
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [secondName,setSecondName] = useState("");
    const [Loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [message,setMessage] = useState("");

    const handleSignUp = async  ()=>{
        try{
            setLoading(true);
            const res = await axios.post(SiteUrl + "/api/v1/user/signup",{
                userName:userName,
                password:password,
                firstName:firstName,
                secondName: secondName
            })
            console.log(res);
                setLoading(false);
                navigate("/signin");
                return;
        }catch(e){
            const message = e?.response?.data?.message || "Something went wrong!";
            setMessage(message);
            console.log(e);
            setLoading(false);
            return;
        }
    }

    const onUserNameChange = (e)=>{
        setUserName(e.target.value);
    }
    const onPasswordChange = (e)=>{
        setPassword(e.target.value);
    }
    const onFirstNameChange = (e)=>{
        setFirstName(e.target.value);
    }
    const onSecondNameChange = (e)=>{
        setSecondName(e.target.value);
    }

    return (
        <div className="w-[100%] h-[100%] bg-gray-400 flex items-center justify-center">
        <div className="bg-white px-[30px] py-[20px] rounded-[7px] text-center flex flex-col gap-[15px]">
            <h1 className="text-5xl font-bold">
                Sign Up
            </h1>
            <p className="text-gray-500 text-xl">Enter your name to create an Account</p>
            <InputComp onChange={onFirstNameChange} Label={"First Name"} placeholder={"Vijay"} />
            <InputComp onChange={onSecondNameChange} Label={"Last Name"} placeholder={"N S"} />
            <InputComp onChange={onUserNameChange} Label={"Email"} Type={"email"} placeholder={"Vijay@gmail.com"} />
            <InputComp onChange={onPasswordChange} Label={"Password"} Type={"password"} />

            <button onClick={()=>{handleSignUp()}} className="text-xl bg-black text-white p-[10px] rounded-[5px]">{Loading?"Loading":"Sign In"}</button>

            <p className="text-md font-semibold">Already an account? <Link to="/signin">Login</Link></p>
            {message && <div>
                <p className="text-md text-red-500">{message}</p>
            </div>}
        </div>
        </div>
    )
}

export default SignUp;
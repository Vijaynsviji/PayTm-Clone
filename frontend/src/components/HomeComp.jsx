import axios from "axios";
import DialogComp from "../Utils/DialogComp";
import InputComp from "../Utils/InputComp";
import PersonaComp from "../Utils/PersonaComp";
import UserListcomp from "./UserListComp";

import { useEffect, useState } from "react";
import { SiteUrl } from "../Utils/SiteData";

const HomeComp = ({currentUser,userList,setCurrentUserData})=>{

    const [showDialog,setShowDialog] = useState(false);
    const [selectedUser,setSelectedUser]  = useState("");
    const [Loading,setLoading] = useState(false);
    const [message,setMessage] = useState({
        msg: "",
        type: 'Success'
    });


    const handleSendButtonClick = (userName)=>{
        setSelectedUser(userName);
        setShowDialog(true);
    }

    const handleTranferMoney = async  (money)=>{
        try{
            setLoading(true);
            const selectedUserId = selectedUser?.id;
            const Token = localStorage.getItem("token");
            const res = await axios.post(SiteUrl + "/api/v1/account/transfer",{
                ToId: selectedUserId,
                Amount: money
            },{ 
                headers: {
                    Authorization: "Bearer " + Token
                } 
            });
            setMessage({msg:res?.data?.message,type:'Success'});
            setCurrentUserData(prev=>({...prev,balance:prev?.balance-money}));
        }catch(e){
            const message = e?.response?.data?.message || "Something went wrong!";
            setMessage({msg:message,type:'Error'});
            console.log(e);
        }finally{
            setLoading(true);
            setTimeout(()=>{
                setShowDialog(false);
                setMessage({
                    msg: "",
                    type: "Success"
                })
            },[2000])
        }
    }
    return (
        <div className="flex flex-col gap-[20px]">
            <div className="p-[20px] border-b border-gray-200 pb-[15px] flex flex-row justify-between">
                <h1 className="text-4xl font-bold">Payments App</h1>
                <div className="flex items-center gap-[20px]">
                     <div className="font-medium text-xl">Hello, {currentUser?.firstName}</div>
                    <PersonaComp userName={currentUser?.firstName} />
                </div>
               
            </div>
            <div className="px-[20px]">
                <p className="text-2xl font-bold">Your Balance Rs {currentUser?.balance?.toFixed(2)}</p>
            </div>
            <div className="px-[20px] flex flex-col gap-[20px]">
                 <h2 className="text-2xl font-bold">Users</h2>
                <InputComp placeholder={"Search users.."} />
                <div className="flex flex-col gap-[20px]">
                    {
                    userList.map(item=>{
                        return <UserListcomp user={item} key={item?._id} setShowDialog={setShowDialog} handleSendButtonClick={handleSendButtonClick} userName={item?.userName} />
                    })
                }
                </div>
                
            </div>
            {showDialog && <DialogComp handleTranferMoney={handleTranferMoney} message={message} user={selectedUser} setShowDialog={setShowDialog} />}
        </div>
    );
}

export default HomeComp;
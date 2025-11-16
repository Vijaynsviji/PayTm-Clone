import DialogComp from "../Utils/DialogComp";
import InputComp from "../Utils/InputComp";
import PersonaComp from "../Utils/PersonaComp";
import UserListcomp from "./UserListComp";

import { useState } from "react";

const HomeComp = ({currentUser})=>{
    const userList = [
        {
            userName: "Vijay"
        },
        {
            userName: "Vinutha"
        },
        {
            userName: "Uday"
        },
        {
            userName: "Darshan K C"
        }
    ]

    const [showDialog,setShowDialog] = useState(false);
    const [selectedUser,setSelectedUser]  = useState("");

    const handleSendButtonClick = (userName)=>{
        setSelectedUser(userName);
        setShowDialog(true);
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
                <p className="text-2xl font-bold">Your Balance Rs 0</p>
            </div>
            <div className="px-[20px] flex flex-col gap-[20px]">
                 <h2 className="text-2xl font-bold">Users</h2>
                <InputComp placeholder={"Search users.."} />
                <div className="flex flex-col gap-[20px]">
                    {
                    userList.map(item=>{
                        return <UserListcomp setShowDialog={setShowDialog} handleSendButtonClick={handleSendButtonClick} userName={item?.userName} />
                    })
                }
                </div>
                
            </div>
            {showDialog && <DialogComp userName={selectedUser} setShowDialog={setShowDialog} />}
        </div>
    );
}

export default HomeComp;
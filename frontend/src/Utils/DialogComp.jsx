import InputComp from "./InputComp";
import PersonaComp from "./PersonaComp";
import { useState } from "react";

const DialogComp = ({user,setShowDialog,message,handleTranferMoney})=>{
    const [amount,setAmount] = useState(0);

    const onChangeAmount = (e)=>{
        try{
        if(typeof e.target.value == "string"){
            setAmount(Number(e.target.value))
            return;
        }
        setAmount(e.target.value);
        }catch(e){
            console.log(e);
        }
    }
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow-lg w-[90%] flex flex-col gap-[20px] max-w-md p-8">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-3xl">Send Money</h1>
                    <button onClick={()=>setShowDialog(false)} className="text-medium text-gray-500 bg-gray-100 rounded-[50%] h-[30px] w-[30px]">X</button>
                </div>

                <div className="flex items-center gap-[30px]">
                    <PersonaComp userName={user?.userName} />
                    <h2 className="text-2xl">{user?.userName}</h2>
                </div>

                <InputComp onChange={onChangeAmount} placeholder={"Enter amount"} Label="Amount (is Rs)" />
                <button onClick={()=>{handleTranferMoney(amount)}}  className="text-xl bg-black text-white py-[10px] px-[20px] rounded-[5px]">Initiate Transfer</button>
                {message?.msg && message?.type==="Error" && <div className="text-center">
                <p className="text-md text-red-500">{message?.msg}</p>
            </div>}
            {message?.msg && message?.type==="Success" && <div className="text-center">
                <p className="text-md text-green-500">{message?.msg}</p>
            </div>}
            </div>
        </div>
    );
}

export default DialogComp;
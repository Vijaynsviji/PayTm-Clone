import InputComp from "./InputComp";
import PersonaComp from "./PersonaComp";


const DialogComp = ({userName,setShowDialog})=>{
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl shadow-lg w-[90%] flex flex-col gap-[20px] max-w-md p-8">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-3xl">Send Money</h1>
                    <button onClick={()=>setShowDialog(false)} className="text-medium text-gray-500 bg-gray-100 rounded-[50%] h-[30px] w-[30px]">X</button>
                </div>

                <div className="flex items-center gap-[30px]">
                    <PersonaComp userName={userName} />
                    <h2 className="text-2xl">{userName}</h2>
                </div>

                <InputComp placeholder={"Enter amount"} Label="Amount (is Rs)" />
                <button  className="text-xl bg-black text-white py-[10px] px-[20px] rounded-[5px]">Initiate Transfer</button>
            </div>
        </div>
    );
}

export default DialogComp;
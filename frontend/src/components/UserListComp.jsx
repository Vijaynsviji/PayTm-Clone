import DialogComp from "../Utils/DialogComp";
import PersonaComp from "../Utils/PersonaComp";


const UserListComp = ({user,userName,handleSendButtonClick})=>{

    return (
        <div className="flex justify-between">
            <div className="gap-[20px] flex items-center">
                 <PersonaComp userName={userName} />
                <h2 className="font-semibold text-2xl">{userName}</h2>
            </div>
            <button onClick={()=>{handleSendButtonClick(user)}} className="text-xl bg-black text-white py-[10px] px-[20px] rounded-[5px]">Send Money</button>
            
        </div>
    );
}

export default UserListComp;
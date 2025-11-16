

const InputComp = ({Label="",Type="text",placeholder,onChange})=>{
    return (
    <div className="flex flex-col items-start gap-[10px]">
        <label className="font-semibold text-xl" >{Label}</label>
        <input onChange={onChange} placeholder={placeholder} className="text-xl p-[10px] w-[100%] border-solid border-gray-300 border-1 rounded-[5px]" type={Type} />
    </div>);
}

export default InputComp;
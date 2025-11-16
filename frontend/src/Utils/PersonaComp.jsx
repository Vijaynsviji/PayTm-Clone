const PersonaComp = ({userName})=>{
    const firstLetter = userName?.[0]?.toUpperCase() || "U";
    return (
        <div className="text-xl font-medium bg-gray-100 w-[50px] h-[50px] justify-center items-center flex rounded-[50%] p-[10px]">
            {firstLetter}
        </div>
    );
}

export default PersonaComp;
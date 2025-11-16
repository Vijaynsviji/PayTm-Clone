
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteUrl } from "../Utils/SiteData";
import HomeComp from "./HomeComp";
const Home = () => {

    // const [Loading,setLoading] = useState(false);
    // const [currentUserData,setCurrentUserData] = useState({
    //     firstName: "",
    //     secondName: "",
    //     userName: "",
    //     userId: "",
    // });
    // let navigate = useNavigate();
    // useEffect(()=>{
    //     CheckUser();
    // },[])



    // async function CheckUser (){
    //      const isVerified = await VerfifyUser();
    //     if(!isVerified){
    //         navigate("/signin");
    //     }
    // }

    // async function VerfifyUser() {
    //     try{
    //         setLoading(true);
    //     const Token = localStorage.getItem("token");
    //     const res = await axios.get(
    //         SiteUrl + "/api/v1/user/verifyUser",
    //         {
    //             headers: {
    //                 Authorization: "Bearer " + Token
    //             },
    //         }
    //     );
    //     if (res.status == 200) {
    //         const resData = res?.data;
    //         if(resData?.userData){
    //             setCurrentUserData(resData?.userData);
    //         }
    //         setLoading(false);
    //         return true;
    //     } else {
    //         setLoading(false);
    //         return false;
    //     }}
    //     catch(e){
    //         setLoading(false);
    //         console.log(e);
    //         return false;
    //     }
    // }
    return (
        <>
            {/* {Loading?<h1>Loading.......</h1>:<h1>Home</h1>} */}
            <HomeComp currentUser={{
                _id:
                    "6919803c72760331b8c9a6d9",
                firstName:
                    "Rahul",
                secondName:
                    "Sharma",
                userName:
                    "rahul.sharma@example.com"
            }} />
        </>
    );
}

export default Home;
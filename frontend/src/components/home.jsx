
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiteUrl } from "../Utils/SiteData";
import HomeComp from "./HomeComp";
const Home = () => {

    const [Loading,setLoading] = useState(false);
    const [userList,setUserList] = useState([]);
    const [currentUserData,setCurrentUserData] = useState({
        firstName: "",
        secondName: "",
        userName: "",
        userId: "",
        balance: 0,
    });
    let navigate = useNavigate();
    useEffect(()=>{
        async function FetchAlldata(){
            await CheckUser();
        }

        FetchAlldata();
        
    },[])

    const fetchAllusersData = async (userId)=>{
        try{
            setLoading(true);
            const Token = localStorage.getItem("token");
            const res = await axios.get(SiteUrl + "/api/v1/user/bulk",{
                headers: {
                    Authorization: "Bearer " + Token
                },
                params:{
                    filter: ""
                }
            });
            setUserList(res?.data?.user?.filter(item=>item?.id!=userId));
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }



    async function CheckUser (){
        const isVerified = await VerfifyUser();
        if(!isVerified?.userId){
            navigate("/signin");
            return ;
        }
        await fetchAllusersData(isVerified?.userId);
    }

    async function VerfifyUser() {
        try{
            setLoading(true);
        const Token = localStorage.getItem("token");
        const res = await axios.get(
            SiteUrl + "/api/v1/user/verifyUser",
            {
                headers: {
                    Authorization: "Bearer " + Token
                },
            }
        );
        if (res.status == 200) {
            const resData = res?.data;
            if(resData?.userData){
                setCurrentUserData(resData?.userData);
            }
            setLoading(false);
            return resData?.userData;
        } else {
            setLoading(false);
            return {}
        }}
        catch(e){
            setLoading(false);
            console.log(e);
            return {};
        }
    }
    return (
        <>
            {Loading?<h1>Loading.......</h1>:<HomeComp setCurrentUserData={setCurrentUserData} userList={userList} currentUser={currentUserData} />}
            
        </>
    );
}

export default Home;
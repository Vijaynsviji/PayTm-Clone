import jwt from "jsonwebtoken";
import 'dotenv/config';




export default function UserAuthMiddleWare(req,res,next){
    const header = req.headers;
    const Auth = header?.authorization;
    if(Auth){
        if(Auth.substring("Bearer")){
            const token = Auth.split(' ')[1];
            try{
                const data = jwt.verify(token,process.env.JWT_SECRETE);
                console.log(data);
                next();
                return;
            }catch(e){
                res.status(404).json({message: "Token Invalid"});
                return;
            }
        }
    }
    res.status(404).json({message:"Please SignUp Before Logging In"});
    return;
}
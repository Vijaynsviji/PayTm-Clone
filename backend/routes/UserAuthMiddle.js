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
                res.send("Token Invalid");
                return;
            }
        }
    }
    res.send("Please SignUp Before Logging In");
    return;
}
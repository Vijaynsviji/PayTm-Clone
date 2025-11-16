


export const GetToken = (rawToken)=>{
    let token = "";
    if(rawToken.substring("Bearer")){
       token = rawToken.split(' ')?.[1];
    }
    return token;
}
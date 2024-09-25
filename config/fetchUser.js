import jwt from "jsonwebtoken";

export default function fetchUser(req,res,next) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            res.status(401).json({error: "Authenticate using valid token"})
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log(data,"-----------")
        req.user = data;
        next();
    }
    catch(err){
        res.status(500).json({error: "Server Error"})
    }
}
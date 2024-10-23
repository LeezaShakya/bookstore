import jwt from "jsonwebtoken";

export default function fetchUser(req,res,next) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            res.status(401).json({error: "Authenticate using valid token"})
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({message: 'Forbidden'})
            req.user = decoded
            next();
        }
        );
    }
    catch(err){
        res.status(500).json({error: "Server Error"})
    }
}
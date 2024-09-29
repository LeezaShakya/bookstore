import { expressjwt } from "express-jwt";

export default function authJwt() {
    const secret = process.env.JWT_SECRET;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        //exclude api(these api can be accessed by user)
        path: [
            '/api/user/login',
            '/api/user/register',
            {url:/\/api\/books(.*)/, methods: ['GET','OPTIONS']},
            {url:/\/api\/genre(.*)/, methods: ['GET','OPTIONS']},
            {url:/\/api\/authors(.*)/, methods: ['GET','OPTIONS']},
            {url:/\/api\/orders(.*)/, methods: ['POST']},
            {url:/\/api\/orders\/all/, methods: ['GET']},
        ]
    })
}

//payload=token data
async function isRevoked(req, jwt){
    const payload = jwt.payload
    if(payload.role !== "Admin"){
        return true
    }
    else {
        return false
    }
}
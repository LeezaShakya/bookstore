import { expressjwt } from "express-jwt";

export default function authJwt() {
    const secret = process.env.JWT_SECRET;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        //exclude api
        path: [
            '/api/user/login',
            '/api/user/register',
            {url:/\/api\/books(.*)/, methods: ['GET','OPTIONS']},
            {url:/\/api\/genre(.*)/, methods: ['GET','OPTIONS']},
            {url:/\/api\/authors(.*)/, methods: ['GET','OPTIONS']},
            {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST', 'DELETE']},
            {url: /\/api\/v1\/cart(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
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
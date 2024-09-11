export default function errorHandler(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        console.log(err);
        res.status(401).json({message: "User is not authorized"})
    }

    if(err.name === 'ValidationError') {
        res.status(401).json({message: "User is not validated"})
    }

    return res.status(500).json({err})
}
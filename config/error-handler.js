export default function errorHandler(err, req, res, next) {
    console.log(err)
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: "User is not authorized" }); // Return after sending the response
    }

    if (err.name === 'ValidationError') {
        return res.status(401).json({ message: "User is not validated" }); // Return after sending the response
    }

    return res.status(500).json({ message: "Internal Server Error", error: err.message }); // Always return in all cases
}

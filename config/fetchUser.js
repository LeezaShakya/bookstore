import jwt from "jsonwebtoken";

export default function fetchUser(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Authenticate using a valid token" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Authenticate using a valid token" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // Log the error for debugging purposes
                console.error("Token verification failed:", err);
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = decoded; // Store decoded user info in request object
            next(); // Call next middleware or route handler
        });
    } catch (err) {
        console.error("Server error:", err); // Log the server error
        res.status(500).json({ error: "Server Error" });
    }
}

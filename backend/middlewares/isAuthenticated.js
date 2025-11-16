import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Try to get token from cookies first, then from Authorization header
        let token = req.cookies.token;
        
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }
        
        if (!token) {
            console.log("No token found in cookies or Authorization header");
            console.log("Cookies:", req.cookies);
            console.log("Authorization header:", req.headers.authorization);
            return res.status(401).json({
                message: "User not authenticated - No token provided",
                success: false,
            })
        }
        
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log("Authentication error:", error);
        return res.status(401).json({
            message: "Authentication failed - Invalid or expired token",
            success: false
        });
    }
}
export default isAuthenticated;
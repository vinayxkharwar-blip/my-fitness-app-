const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers["x-auth-token"];
        if (!authHeader) {
            return res.status(401).json({ error: "Access denied. No authentication token provided." });
        }

        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader.trim();
        if (!token) {
            return res.status(401).json({ error: "Access denied. Token is empty." });
        }

        const secret = process.env.JWT_SECRET || "fitsnap_secure_default_secret_key";
        const decoded = jwt.verify(token, secret);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role || "user"
        };
        req.auth = { userId: decoded.id };

        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;

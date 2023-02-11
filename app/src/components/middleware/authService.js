import jwt from "jsonwebtoken";
import UserService from "../service/userService.js";

export function generateToken(user) {
    const data = { id: user.id, role: user.role };
    const signature = "MySuper_z3kr3t";
    return jwt.sign(data, signature);
}

export async function verifyUser(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).send("No authorization token provided");
    }
    const parsedUserToken = verifyToken(authToken);
    const userService = new UserService();
    const findedUser = await userService.getUser(parsedUserToken.id);
    if (!findedUser) {
        return res.status(401).send("User not found");
    }
    req.user = findedUser;
    return next();
}

export function verifyRequiredRole(requiredRole) {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).send("action not allowed");
        } else {
            return next();
        }
    };
}

function verifyToken(token) {
    const signature = "MySuper_z3kr3t";
    try {
        return jwt.verify(token, signature);
    } catch (err) {
        console.log(err);
        return false;
    }
}

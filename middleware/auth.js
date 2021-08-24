import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import Users from '../models/userCredentials.js'

dotenv.config()

const { JWT_SECRET } = process.env
const auth = async (req, res, next) => {

    console.log("AUTHORIZATION TOKEN -> ", req.headers.authorization);

    if (!req.headers.authorization) {
        console.log("NOT FOUND authorization");
        return next({
            message: "You need to be logged in to visit this route",
            statusCode: 401,
        });
    }

    const token = req.headers.authorization.replace("Bearer", "").trim();
    console.log("FINAL TOKEN", token);


    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED -> ", decoded);
        const user = await Users.findById(
            decoded.id
        );

        req.user = user;
        next();

    } catch (error) {
        console.log(error)
    }
}

export default auth;
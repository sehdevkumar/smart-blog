import { type NextApiRequest } from "next";
import jwt from 'jsonwebtoken';

export const getUserOnServer = (req: NextApiRequest)=> {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split(' ')[1];

    // Validate the token
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
         
        if(decodedToken) {
            return decodedToken
        }else {
            return null
        }

    } catch (error) {
        return null
    }
}
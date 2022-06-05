import jwt from 'jsonwebtoken';
import {promisify} from 'util';
import authConfig from '../../config/auth.js';

export default async (req,res,next) => {
    const authHeaders = req.headers.authorization;

    if(!authHeaders)
        return res.status(401).json({message: 'This route is private, you need a token to enter it.'});

    const token = authHeaders.split(' ')[1];

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Token Inválido!'});
    }
    next();
}
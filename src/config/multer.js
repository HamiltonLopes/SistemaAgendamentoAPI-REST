import multer from 'multer';
import crypto from 'crypto';
import {dirname, extname, resolve} from 'path';
import User from '../app/models/User.js';
import { fileURLToPath } from 'url';

export default {
    storage: multer.diskStorage({
        
        destination: resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            crypto.randomBytes(10, async (err, res) => {
                if (err) return cb(err);

                const user = await User.findByPk(req.userId);
                return cb(null, user.name + res.toString('hex') + extname(file.originalname));
            })
        }
    }),

}
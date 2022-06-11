import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';
import * as Yup from 'yup';

export default new class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(3),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(401).json({ error: "Dados incompletos!" });

        const user = await User.findOne({ where: { email } });

        if (!user)
            return res.status(404).json({ error: "User not found!" });

        if (!(await user.checkPassword(password)))
            return res.status(401).json({ error: "Invalid Password!" })

        const { id, name } = user;

        return res.json({ id, name, email, token: jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: authConfig.expiresIn }) });
    }
}


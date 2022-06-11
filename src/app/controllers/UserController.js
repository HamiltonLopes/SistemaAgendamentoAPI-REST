import User from "../models/User.js";
import * as Yup from 'yup';
import File from "../models/File.js";

export default new class UserController {
    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(401).json({ error: "Dados incompletos!" });

        const userExists = await User.findOne({
            where: { email: req.body.email }
        });

        if (userExists)
            return res.status(400).json({ error: "Email já cadastrado!" });

        const { id, name, email, provider } = await User.create(req.body);
        return res.json({ id, name, email, provider });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            new_name: Yup.string(),
            new_email: Yup.string().email(),
            new_password: Yup.string().min(6),

            name: Yup.string().when('new_name',
                (new_name, field) => new_name ? field.required() : field
            ),

            email: Yup.string().email().when('new_email',
                (new_email, field) => new_email ? field.required() : field
            ),

            password: Yup.string().min(3).when('new_password',
                (new_password, field) => new_password ? field.required('Password é necessário!') : field
            ),

            confirm_password: Yup.string().when('password',
                (password, field) => password ? field.required().oneOf([Yup.ref('new_password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: "Dados incompletos!" });
        }


        const user = await User.findByPk(req.userId);
        let { email, password, name, new_name, new_email, new_password, confirm_password, pic_id:Files } = req.body;

        if ((email && (email !== user.email)) || (password && !(await user.checkPassword(password))) || (name && !(name === user.name)))
            return res.status(401).json({ error: (email && email !== user.email) ? "Email Incorreto!" : (name && name !== user.name) ? "Nome Incorreto!" : "Senha Incorreta!" });

        if (new_name)
            name = new_name;

        if (new_password)
            password = new_password;

        if (new_email) {
            if (await User.findOne({ where: { email: new_email } }))
                return res.status(401).json({ error: "Email já cadastrado!" });
            else
                email = new_email;
        }

        if(Files)
            if (!(await File.findOne({where: {id: Files }})))
                return res.status(404).json({ error: "File not found!" });


        const updatedUser = await user.update({
            name,
            password,
            email,
            Files
        });

        return res.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email });
    }

}
import User from "../models/User.js";

export default new class UserController {
    async store(req, res){
        const userExists = await User.findOne({
            where:{email: req.body.email }
        });

        if(userExists)
            return res.status(400).json({error: "Email já cadastrado!"});
        
        const {id, name, email, provider} = await User.create(req.body);
        return res.json({id, name, email, provider});
    }

    async update(req,res){
        const user = await User.findByPk(req.userId);
        let {email, password, name, new_name, new_email, new_password, confirm_password} = req.body;

        if(email !== user.email || !(await user.checkPassword(password)) || (name && !(name === user.name)) )
            return res.status(401).json({error: email !== user.email ? "Email Incorreto!" : name === user.name ? "Senha Incorreta!" : "Nome Incorreto!"});
        
        if(new_name)
            name = new_name;
        
        if(new_password)
            if(new_password === confirm_password)
                password = new_password;
            else
                return res.status(401).json({error: "Senha de confirmação não confere com nova senha!"})
        
        if(new_email){
            if(await User.findOne({where: {email: new_email}}))
                return res.status(401).json({error: "Email já cadastrado!"});
            else
                email = new_email;
        }

        const updatedUser = await user.update({
            name,
            password,
            email
        })
            
        return res.json(updatedUser);
    }

}
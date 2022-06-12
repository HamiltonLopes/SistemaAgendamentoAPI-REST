import User from "../models/User.js";
import File from "../models/File.js";

export default new class CollaboratorController{
    async index(req, res){
        const collaboratorList = await User.findAll({where: {provider: true },
            attributes: ['id', 'name','email', 'pic_id'],
            include: [{
                model: File,
                as: 'pic',
                attributes: ['id', 'name', 'url']
            }]});

        return res.json(collaboratorList);
    }
}
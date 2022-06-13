import User from '../models/User.js';
import Notification from '../schema/Notification.js'


export default new class NotificationController{
    async index(req, res){
        const collaborator = await User.findByPk(req.userId);

        if(!(collaborator && collaborator.provider))
            return res.status(404).json({error: "This route is only available for collaborators!"});
        
        const notifications = await Notification.find({user: collaborator.id}).sort({createdAt:"desc"});
        // .limit(20); opcional para pegar apenas até 20 resultados.
        
        return res.json(notifications);
    }

    async update(req, res){
        const collaborator = await User.findByPk(req.userId);

        if(!(collaborator && collaborator.provider))
            return res.status(404).json({error: "This route is only available for collaborators!"});

        const notifications = await Notification.findByIdAndUpdate(req.params.id, {read: true}, {new: true}); //new true faz com que o retorno da promise seja o objeto alterado.

        return res.json(notifications);
    }

}


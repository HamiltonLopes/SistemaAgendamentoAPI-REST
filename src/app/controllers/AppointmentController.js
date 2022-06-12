import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import * as Yup from 'yup';


export default new class AppointmentControler{
    async store(req, res){

        const schema = Yup.object().shape({
            collaborator_id: Yup.number().required(),
            date: Yup.date().required()
        });

        if(!(await schema.isValid(req.body)))
            return res.status(401).json({error: "Erro de Requisicao!"});

        const {collaborator_id, date} = req.body;

        const collaborator = await User.findByPk(collaborator_id);

        if(!collaborator.provider)
            return res.status(404).json({error: "Colaborador nao localizado!"});


        const appointment = await Appointment.create({
            user_id: req.userId,
            collaborator_id,
            date
        });
        return res.json(appointment);
    }
}
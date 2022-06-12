import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import File from "../models/File.js";

import { parseISO, isBefore, subHours, addHours } from 'date-fns';
import * as Yup from 'yup';
import { Op } from 'sequelize';

export default new class AppointmentControler {

    async index(req, res){
        const {page = 1, off: appointmentsPewPage = 5} = req.query;

        const appointmentList = await Appointment.findAll({
            where: { user_id: req.userId, canceledAt: null},
            order: ['date'],
            attributes:['id', 'date'],
            limit: appointmentsPewPage,
            offset: (page - 1) * appointmentsPewPage,
            include: [{
                model: User,
                as: 'collaborator',
                attributes: ['id', 'name'],
                include:[{
                    model: File,
                    as: 'pic',
                    attributes: ['name', 'url']
                }]
            }]
        })

        return res.json(appointmentList);
    }

    async store(req, res) {

        const schema = Yup.object().shape({
            collaborator_id: Yup.number().required(),
            date: Yup.date().required()
        });

        if (!(await schema.isValid(req.body)))
            return res.status(401).json({ error: "Erro de Requisicao!" });

        const { collaborator_id, date } = req.body;
        console.log(date)

        const collaborator = await User.findByPk(collaborator_id);

        if (!collaborator.provider)
            return res.status(404).json({ error: "Colaborador nao localizado!" });

        const hourStart = parseISO(date);

        if (isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: "A data do agendamento nao pode ser anterior a data de hoje!" });
        }

        const checkAvaliability = await Appointment.findOne({
            where: {
                [Op.or]: [ //retorna o appointment do colaborador ou do usuario
                    { user_id: req.userId },
                    { collaborator_id }
                ],
                canceledAt: null,
                date: {
                    [Op.gt]: subHours(hourStart, 1), //retorna o appointment com até 1hora antes do marcado agora
                    [Op.lt]: addHours(hourStart, 1) //retorna o appointment com até 1hora depois do marcado agora
                }
            }
        });

        if (checkAvaliability) 
            return res.status(400).json({ error: "Horario nao disponivel!" });

        const appointment = await Appointment.create({
            user_id: req.userId,
            collaborator_id,
            date
        });

        return res.json(appointment);
    }
}
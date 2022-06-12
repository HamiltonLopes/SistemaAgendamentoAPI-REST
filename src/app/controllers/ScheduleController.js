import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import File from "../models/File.js";

import { parseISO, startOfDay, endOfDay } from "date-fns";
import { Op } from "sequelize";

export default new class ScheduleController{
    async index(req,res){
        const user = await User.findByPk(req.userId);
        if(!user.provider)
            return res.status(401).json({error: "This user isn't a collaborator!"});
        
        const {date} = req.query;
        const dateParsed = parseISO(date);

        const appointmentList = await Appointment.findAll({
            where:{
                collaborator_id: req.userId,
                canceledAt: null,
                date:{
                    [Op.between]: [startOfDay(dateParsed), endOfDay(dateParsed)]
                }
            },
            attributes:['id','date'],
            include: [{
                model: User,
                as: 'user',
                attributes: ['id', 'name'],
                include:[{
                    model: File,
                    as: 'pic',
                    attributes: ['name', 'url']
                }]
            }],
            order: ['date']
        })


        res.json(appointmentList);
    }
}
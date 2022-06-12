import Sequelize from 'sequelize';
import User from '../app/models/User.js';
import File from '../app/models/File.js';
import Appointment from '../app/models/Appointment.js';
import databaseConfig from '../config/database.js';

const models = [User, File, Appointment]; 

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);


        models.map( 
            model => {
               return model.init(this.connection);
            }
        ).map(
            model =>{
                return model.associate && model.associate(this.connection.models);
            }
        );
    }
}

export default new Database();

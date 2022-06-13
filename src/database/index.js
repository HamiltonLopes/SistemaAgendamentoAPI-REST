import Sequelize from 'sequelize';
import Mongoose from 'mongoose';
import User from '../app/models/User.js';
import File from '../app/models/File.js';
import Appointment from '../app/models/Appointment.js';
import databaseConfig from '../config/database.js';

const models = [User, File, Appointment];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);


        models.map(
            model => {
                return model.init(this.connection);
            }
        ).map(
            model => {
                return model.associate && model.associate(this.connection.models);
            }
        );
    }

    mongo() {
        this.mongoConnection = Mongoose.connect(
            'mongodb+srv://sistema:sistema@mongoclusterhamilton.82zmh.mongodb.net/sistema?retryWrites=true&w=majority',
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
    }
}

export default new Database();

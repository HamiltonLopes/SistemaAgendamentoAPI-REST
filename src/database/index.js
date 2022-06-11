import Sequelize from 'sequelize';
import User from '../app/models/User.js';
import File from '../app/models/File.js';
import databaseConfig from '../config/database.js';

const models = [User, File]; //Needed only on teacher version

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);

        // User.init(this.connection); //My Version

        models.map( // Teacher Version
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

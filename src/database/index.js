import Sequelize from 'sequelize';
import User from '../app/models/User.js';
import databaseConfig from '../config/database.js';

// const models = [User]; //Needed only on teacher version

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);

        User.init(this.connection); //My Version

        // models.map( // Teacher Version
        //     model => {
        //         model.init(this.connection);
        //     }
        // );
    }
}

export default new Database();

import Sequelize, {Model} from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model{
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        }, {
            sequelize,
        });

        this.addHook('beforeSave', async user => user.password && (user.password_hash = await bcrypt.hash(user.password,10)));

        return this;
    }

    static associate(models){
        this.belongsTo(models.File, { foreignKey: 'pic_id', as:'pic' });
    }

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
}

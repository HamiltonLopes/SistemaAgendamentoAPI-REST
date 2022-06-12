import Sequelize, { Model } from 'sequelize';

export default class Appointment extends Model{
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                canceledAt: Sequelize.DATE
            },
            {
                sequelize
            }
        )
        return this;
    };

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.User, { foreignKey: 'collaborator_id', as: 'collaborator' });
    }


}
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    async checkPassword(userPassword) {
        return await bcrypt.compare(userPassword, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            },
            async beforeUpdate(userData) {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            }
        },
        sequelize,
        underscored: true,
        freezeTableName: true,
        modelName: 'user'
    }
)

module.exports = User;
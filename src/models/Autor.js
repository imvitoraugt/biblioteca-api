import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const Autor = sequelize.define('autores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    biografia: {
        type: DataTypes.TEXT
    }
}, {tableName: 'autores', timestamps: true})

export default Autor
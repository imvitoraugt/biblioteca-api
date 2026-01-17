import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const Usuario = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo:{
        type: DataTypes.ENUM('admin', 'leitor'),
        defaultValue: 'leitor'
    }
}, {tableName: 'usuarios', timestamps: true})

export default Usuario
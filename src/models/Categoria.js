import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const Categoria = sequelize.define('categorias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {tableName: 'categorias', timestamps: false})

export default Categoria
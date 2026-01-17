import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const Livro = sequelize.define('livros', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade_disponivel: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {tableName: 'livros', timestamps: true})

export default Livro
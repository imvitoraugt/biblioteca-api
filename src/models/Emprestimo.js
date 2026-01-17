import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const Emprestimo = sequelize.define('emprestimos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data_retirada: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    data_prazo: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    data_devolucao: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    status:{
        type: DataTypes.ENUM('ativo', 'concluido', 'atrasado'),
        defaultValue: 'ativo'
    }    
}, {tableName: 'emprestimos', timestamps: true})

export default Emprestimo
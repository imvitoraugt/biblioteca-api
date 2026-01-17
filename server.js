import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './src/config/db.js'
import './src/models/index.js'
import routes from './src/routes/routes.js'

dotenv.config()

const app = express()
const porta = process.env.PORT || 3010

//middlewares globais
app.use(cors())
app.use(express.json()) //para express entender json no corpo das requisições
app.use(routes)
console.log('Tentando conectar ao servidor')

sequelize.sync({ force: false}) //force false pra garantir que não apagará os dados do banco se a tabela existir
    .then(() => { console.log('Banco de dados sincronizado e tabelas criadas')
    
    })
    .catch((e) => { console.error('Erro ao sincronizar banco de dados: ', e)
    })

app.listen(porta, () => {
    console.log(`API rodando em http://localhost:${porta}`);
    
})
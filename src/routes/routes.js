import { Router } from 'express'
import UsuarioController from '../controllers/UsuarioController.js'

const routes = Router()

routes.post('/usuarios', UsuarioController.novoUsuario)
routes.post('/login', UsuarioController.login)

export default routes
import { Router } from 'express'
import UsuarioController from '../controllers/UsuarioController.js'
import LivroController from '../controllers/LivroController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import AuxiliarController from '../controllers/AuxiliarController.js'
import EmprestimoController from '../controllers/EmprestimoController.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const routes = Router()

routes.post('/usuarios', UsuarioController.novoUsuario)
routes.post('/login', UsuarioController.login)
routes.get('/livros', LivroController.listar)

routes.use(authMiddleware)

routes.post('/livros', adminMiddleware, LivroController.criar)
routes.put('/livros/:id', adminMiddleware, LivroController.atualizar)
routes.delete('/livros/:id', adminMiddleware, LivroController.deletar)

routes.post('/autores', adminMiddleware, AuxiliarController.criarAutor)
routes.post('/categorias', adminMiddleware,AuxiliarController.criarCategoria)

routes.get('/emprestimos', EmprestimoController.listar)
routes.post('/emprestimos', EmprestimoController.criar)
routes.put('/emprestimos/:id/devolucao', EmprestimoController.devolver)
routes.put('/emprestimos/:id/renovacao', EmprestimoController.renovar)
export default routes
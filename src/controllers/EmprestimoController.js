import EmprestimoService from "../services/EmprestimoService.js"

class EmprestimoController {

    async criar(req, res) {
        try {
            const { livroId} = req.body
            //Pega o id do usuario direto do token fornecido lá no authMiddleware
            const usuarioId = req.usuarioId
            const emprestimo = await EmprestimoService.realizarEmprestimo(usuarioId, livroId)
            return res.status(201).json(emprestimo)
        
        } catch(e) {
            //se for erro de Regra de Negócio, retorna erro400
            res.status(400).json({erro: e.message})
        }
    }

    async devolver(req, res) {
        try {
            const { id} = req.params
            const emprestimo = await EmprestimoService.devolverLivro(id)
            return res.json({mensagem: 'Livro devolvido com sucesso!', emprestimo})

        } catch(e) {
            return res.status(400).json({erro: e.message})
        } 
    }

    async renovar(req, res) {
        try {
            const { id} = req.params
            const emprestimo = await EmprestimoService.renovarEmprestimo(id)
            return res.json({ message: 'Empréstimo renovado por mais 7 dias!', emprestimo })
        } catch(e) {
            return res.status(400).json({ error: e.message})
        }
    }

    async listar(req, res) {
        try {
            const usuarioId = req.usuarioId
            const emprestimos = await EmprestimoService.listarPorUsuario(usuarioId)
            return res.json(emprestimos)
        } catch(e) {
            return res.status(500).json({ error: e.message })
        }
    }
}
export default new EmprestimoController()
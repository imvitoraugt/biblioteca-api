import { Emprestimo, Livro} from '../models/index.js'

class EmprestimoService {
    async realizarEmprestimo(usuarioId, livroId) {
        const livro = await Livro.findByPk(livroId)
        if(!livro) {
            throw new Error('Livro não encontrado.')
        }
        //Regra de Negócio: verificar estoque
        if(livro.quantidade_disponivel <= 0) {
            throw new Error('Livro indisponível.')
        }
        //Cria empréstimo com prazo de 7 dias para devolução
        const dataHoje = new Date()
        const dataPrazo = new Date()
        dataPrazo.setDate(dataHoje.getDate() + 7)

        const emprestimo = await Emprestimo.create({usuarioId: usuarioId, livroId: livroId, data_prazo: dataPrazo, status: 'ativo'
        })

        //Regra de Negócio: atualiza o estoque (decrementa)
        livro.quantidade_disponivel -= 1
        await livro.save()
        return emprestimo
    }

    async devolverLivro(emprestimoId) {
        const emprestimo = await Emprestimo.findByPk(emprestimoId)

        if(!emprestimo) {
            throw new Error('Empréstimo não encontrado.')
        }
        if(emprestimo.status == 'concluido') {
            throw new Error('Este empréstimo já foi devolvido.')
        }

        emprestimo.status = 'concluido'
        emprestimo.data_devolucao = new Date()
        await emprestimo.save()

        //Regra de Negócio: devolve o livro para o estoque
        const livro = await Livro.findByPk(emprestimo.livroId)
        if(livro) {
            livro.quantidade_disponivel += 1
            await livro.save()
        }
        return emprestimo
    }

    async renovarEmprestimo(emprestimoId) {
        //Busca o empréstimo e inclui os dados do livropara checar o estoque
        const emprestimo = await Emprestimo.findByPk(emprestimoId, { include: Livro})

        if(!emprestimo) throw new Error('Empréstimo não encontrado.')
            //Só renova se o livro tiver emprestado
        if(emprestimo.status !== 'ativo'){
            throw new Error('Apenas empréstimos ativos podem ser renovados.')
        }
        //Bloqueia se tiver com estoque zerado.
        if(emprestimo.Livro && emprestimo.Livro.quantidade_disponivel <= 0){
            throw new Error('Livro indisponível para empréstimo.')
        }

        //Regra de Negócio: alta demanda

        const novoPrazo = new Date(emprestimo.data_prazo)
        novoPrazo.setDate(novoPrazo.getDate() + 7)
        emprestimo.data_prazo = novoPrazo
        
        await emprestimo.save()
        return emprestimo
    }

    // listar emprestimos
    async listarPorUsuario(usuarioId) {
        //Busca pelo ID e inclui os dados do livro
        const emprestimos = await Emprestimo.findAll({
            where: { usuarioId: usuarioId },
            include: Livro 
        })
        return emprestimos
    }
}

export default new EmprestimoService()
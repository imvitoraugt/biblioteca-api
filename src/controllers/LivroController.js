import Livro from '../models/Livro.js'
import Autor from '../models/Autor.js'
import Categoria from '../models/Categoria.js'

class LivroController{
    //listar livro
    async listar(req, res){
        try{
            const livros = await Livro.findAll({
                include: [//traz os dados do autor e categoria junto
                    {model: Autor, attributes: ['nome']},
                    {model: Categoria, attributes: ['nome']}
                ]
            })
            return res.json(livros)
        }catch(e){
            console.error(e);
            return res.status(500).json({mensagem: 'Erro ao listar livros.'})
        }
    }
    //criar livro
    async criar(req, res){
        try{
            const {titulo, quantidade_disponivel, autorId, categoriaId} = req.body
            //verificar se autor e categoria existem 
            const autor = await Autor.findByPk(autorId)
            const categoria = await Categoria.findByPk(categoriaId)

            if(!autor || !categoria){
                return res.status(400).json({erro: 'Autor ou Categoria não identificados.'})
            }
            const novoLivro = await Livro.create({ titulo, quantidade_disponivel, autorId: autorId, categoriaId: categoriaId})
            return res.status(201).json(novoLivro)
        }catch(e){
            console.error(e)
            return res.status(500).json({erro: 'Erro ao criar livro.'})
        }
    }
    //atualizar livro
    async atualizar(req, res){
        try{
            const { id} = req.params
            const { titulo, quantidade_disponivel, autorId, categoriaId} = req.body

            const livro = await Livro.findByPk(id)
            if(!livro) {
                return res.status(404).json({ erro: 'Livro não encontrado.'})
            }
            //Atualiza o campo que for enviado.
            await livro.update({ titulo, quantidade_disponivel, autorId, categoriaId})
            return res.json({mensagem: 'Livro atualizado com sucesso.', livro})
        } catch(e){
            console.error(e)
            return res.json(500).json({erro: 'Erro ao atualizar livro.'})
            
        }
    }
    //deletar livro
    async deletar(req, res){
        try{
            const {id} = req.params
            await Livro.destroy({ where: {id}})
            return res.json({mensagem: 'Livro removido com sucesso.'})
        }catch(e){
            console.error(e)
            res.status(500).json({erro: 'Erro ao deletar livro.'})
        }
    }

}

export default new LivroController()

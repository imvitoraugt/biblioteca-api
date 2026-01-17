import Usuario from "../models/Usuario.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class UsuarioController{
    async novoUsuario(req, res){
        try{
            const {nome, email, senha, cargo} = req.body
            //Aqui verifica se o email já está cadastrado
            const usuarioExistente = await Usuario.findOne({where: {email}})
            if(usuarioExistente){
                return res.status(400).json({mensagem: 'Usuário já cadastrado'})
            }
            //criptografar senha
            const salt = await bcrypt.genSalt(10)
            const senhaHash =  await bcrypt.hash(senha, salt)

            const novoUsuario = await Usuario.create({nome, email, senha: senhaHash, cargo})
            return res.status(201).json({mensagem: 'Usuário cadastrado com sucesso', id: novoUsuario.id, email: novoUsuario.email})

        } catch(e){
            res.status(500).json({mensagem: `Ocorreu um erro ao criar usuário! -> ${e}`})
            
        }

    }

    async login(req, res){
        try{
            const {email, senha} = req.body
            //Busca usuário pelo email
            const usuario = await Usuario.findOne({where: {email}})
            if(!usuario){
                return res.status(404).json({mensagem: 'Credenciais inválidas'})
            }
            //compara a senha enviada com a criptorgrafada no banco
            const senhaValida = await bcrypt.compare(senha, usuario.senha)
            if(!senhaValida){
                return res.status(401).json({ erro: 'Email ou senha inválidos!'})
            }
            //gerar o token jwt, o payload contem id e cargo para usar nas permissões depois
            const token = jwt.sign(
                {id: usuario.id, cargo: usuario.cargo},
                process.env.JWT_SECRET,
                {expiresIn: '1d'} //tempo de expiração do token
            )
            
            return res.json({token, usuario: {id: usuario.id, nome: usuario.nome, cargo: usuario.cargo}})
        }catch(e){
            return res.status(500).json({mensagem: `Erro no servidor! -> ${e}`})
        }
    }
}

export default new UsuarioController()
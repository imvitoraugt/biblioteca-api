import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next){
    //buscar o token no cabeçalho daq requisição
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({erro: 'Token não fornecido!'})
    }
    //separar o Bearer do token
    const [ , token] = authHeader.split(' ')

    try{
        //verificar se o token é valido usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //colocar o id e cargo do user para usar depois
        req.usuarioId = decoded.id
        req.usuarioCargo = decoded.cargo

        return next() //pode passar, tá liberado! ;)
    }catch(e){
        res.status(401).json({ erro : 'Token inválido!'})
    }

}
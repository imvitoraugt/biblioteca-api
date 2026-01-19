export default function adminMiddleware(req, res, next){
    const { usuarioCargo} = req
    console.log('--- DEBUG ADMIN ---');
    console.log('Cargo que chegou na requisição:', usuarioCargo);
    console.log('É igual a admin?', usuarioCargo === 'admin');
    if(usuarioCargo !== 'admin'){
        return res.status(403).json({ erro: 'Apenas administradores podem realizar esta ação.'})
    }

    return next()
}
import Autor from '../models/Autor.js';
import Categoria from '../models/Categoria.js';

class AuxiliarController {
    async criarAutor(req, res) {
        const { nome } = req.body;
        const autor = await Autor.create({ nome});
        return res.json(autor);
    }
    async criarCategoria(req, res) {
        const { nome } = req.body;
        const categoria = await Categoria.create({ nome});
        return res.json(categoria);
    }
}
export default new AuxiliarController();
//Gerenciador de relacionamentos

import Usuario from "./Usuario.js"
import Emprestimo from "./Emprestimo.js"
import Livro from "./Livro.js"
import Autor from "./Autor.js"
import Categoria from "./Categoria.js"

//Definindo relacionamentos 1:* e *:1

// Categoria tem muitos Livros | Livro pertence a Categoria
Categoria.hasMany(Livro)
Livro.belongsTo(Categoria)

// Autor tem muitos Livros | Livro pertence a Autor
Autor.hasMany(Livro)
Livro.belongsTo(Autor)

// Usuario faz muitos Emprestimos | Emprestimo pertence a Usuario
Usuario.hasMany(Emprestimo)
Emprestimo.belongsTo(Usuario)

// Livro pode ter muitos Emprestimos (histórico) | Emprestimo refere-se a um Livro
Livro.hasMany(Emprestimo)
Emprestimo.belongsTo(Livro)

export { Usuario, Emprestimo, Livro, Autor, Categoria }
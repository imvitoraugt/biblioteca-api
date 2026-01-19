//Gerenciador de relacionamentos

import Usuario from "./Usuario.js"
import Emprestimo from "./Emprestimo.js"
import Livro from "./Livro.js"
import Autor from "./Autor.js"
import Categoria from "./Categoria.js"

//Definindo relacionamentos 1:* e *:1

// Categoria tem muitos Livros | Livro pertence a Categoria
Categoria.hasMany(Livro, {foreignKey: 'categoriaId'})
Livro.belongsTo(Categoria, {foreignKey: 'categoriaId'})

// Autor tem muitos Livros | Livro pertence a Autor
Autor.hasMany(Livro, {foreignKey: 'autorId'})
Livro.belongsTo(Autor, {foreignKey: 'autorId'})

// Usuario faz muitos Emprestimos | Emprestimo pertence a Usuario
Usuario.hasMany(Emprestimo, { foreignKey: 'usuarioId' })
Emprestimo.belongsTo(Usuario, { foreignKey: 'usuarioId' })

// Livro pode ter muitos Emprestimos (histórico) | Emprestimo refere-se a um Livro
Livro.hasMany(Emprestimo, {foreignKey: 'livroId'})
Emprestimo.belongsTo(Livro, {foreignKey: 'livroId'})

export { Usuario, Emprestimo, Livro, Autor, Categoria }
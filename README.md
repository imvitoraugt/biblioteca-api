# 📚 API de Biblioteca (Sistema de Gerenciamento)

Projeto final da disciplina de **Programação Web II**, focado no desenvolvimento de uma API RESTful robusta utilizando a arquitetura **MVC**.

## 🎯 Objetivo
Desenvolver um back-end para gerenciamento de biblioteca que vá além do CRUD básico, implementando regras de negócio reais de controle de estoque e circulação de livros.

## 🚀 Tecnologias
* **Node.js** (Runtime)
* **Express** (Framework Web)
* **MySQL** (Banco de Dados Relacional)
* **Sequelize** (ORM)
* **JWT** (Autenticação JSON Web Token)
* **BcryptJS** (Criptografia de senhas)

## 🏛️ Arquitetura MVC
O projeto está organizado rigorosamente conforme o padrão Model-View-Controller:
- `src/models`: Definição das tabelas e relacionamentos (ORM).
- `src/controllers`: Gerenciamento das requisições e respostas HTTP.
- `src/services`: **Regras de Negócio** isoladas (validações de estoque, datas, multas).
- `src/middlewares`: Autenticação e proteção de rotas (Admin vs Leitor).

## ⚙️ Funcionalidades e Regras de Negócio

### 1. Gestão de Acervo
* **Controle de Estoque:** O sistema impede empréstimos de livros com estoque zero.
* **Persistência:** O sistema utiliza o campo `quantidade_disponivel` para gerenciar a disponibilidade física dos exemplares.
* **Atualização Dinâmica:** O estoque é decrementado automaticamente ao emprestar e incrementado ao devolver.

### 2. Circulação (Empréstimos)
* **Prazos:** Definição automática de data de devolução (7 dias).
* **Renovação Inteligente:**
    * Permite renovar o empréstimo por mais 7 dias.
    * **Regra Anti-Monopólio:** O sistema **bloqueia a renovação** se o estoque do livro estiver zerado na estante, garantindo que o exemplar circule para outros usuários.
* **Multas/Atrasos:** Identificação automática de devoluções fora do prazo.

### 3. Segurança
* Acesso protegido por Token JWT (Bearer).
* Senhas armazenadas com hash (Bcrypt).
* Controle de Acesso por Perfil (Admin vs Leitor).

## 🔌 Endpoints Principais

### Autenticação
| Método | Rota | Descrição | Acesso |
| --- | --- | --- | --- |
| POST | `/usuarios` | Cria novo usuário | Público |
| POST | `/login` | Gera Token JWT | Público |

### Livros (Gestão de Acervo)
| Método | Rota | Descrição | Acesso |
| --- | --- | --- | --- |
| GET | `/livros` | Lista o acervo completo | Público |
| POST | `/livros` | Cadastra novo livro | **Admin** |
| PUT | `/livros/:id` | Atualiza dados/estoque | **Admin** |
| DELETE | `/livros/:id` | Remove livro | **Admin** |

### Empréstimos (Circulação)
| Método | Rota | Descrição | Acesso |
| --- | --- | --- | --- |
| GET | `/emprestimos` | Lista meus empréstimos | Leitor/Admin |
| POST | `/emprestimos` | Realiza empréstimo (Baixa estoque) | Leitor/Admin |
| PUT | `/emprestimos/:id/devolucao` | Devolve livro (Sobe estoque) | Leitor/Admin |
| PUT | `/emprestimos/:id/renovacao` | Renova prazo (Se houver estoque) | Leitor/Admin |

## 🔧 Como Rodar

1. Clone o repositório.
2. Configure o arquivo `.env` com suas credenciais do MySQL (use o `.env.example` como base).
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm run dev
   ```

##Diagrama de Entidade e Relacionamento (DER)
erDiagram
    USUARIO ||--o{ EMPRESTIMO : realiza
    AUTOR ||--o{ LIVRO : escreve
    CATEGORIA ||--o{ LIVRO : contem
    LIVRO ||--o{ EMPRESTIMO : possui

    USUARIO {
        int id
        string nome
        string email
        string senha
        enum cargo
    }

    LIVRO {
        int id
        string titulo
        int quantidade_disponivel
        int autorId
        int categoriaId
    }

    EMPRESTIMO {
        int id
        date data_retirada
        date data_prazo
        date data_devolucao
        enum status
        int usuarioId
        int livroId
    }

    AUTOR {
        int id
        string nome
        text biografia
    }

    CATEGORIA {
        int id
        string nome
    }

    

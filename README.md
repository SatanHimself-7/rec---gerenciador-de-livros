https://github.com/SatanHimself-7/rec---gerenciador-de-livros.git

.

📚 Gerenciador de Livros
Projeto de CRUD (Create, Read, Update, Delete) para gerenciamento de livros, desenvolvido em Node.js no backend e HTML + CSS + JavaScript no frontend. O projeto permite cadastrar, consultar, atualizar e excluir livros em um banco de dados relacional (MySQL).

🚀 Tecnologias Utilizadas
💻 Frontend: HTML, CSS e JavaScript puro

🔧 Backend: Node.js + Express

🗄️ Banco de Dados: MySQL

🗂️ Estrutura do Projeto
java
Copiar
Editar
rec---gerenciador-de-livros/
├── backend/      → Servidor Node.js (API)
│   ├── app.js    → Arquivo principal do servidor
│   ├── db.js     → Configuração de conexão com MySQL
│   ├── .env      → Variáveis de ambiente (conexão com DB)
│   └── ...
├── frontend/     → Interface web (HTML, CSS, JS)
│   └── index.html
└── README.md     → Documentação
⚙️ Pré-requisitos
✔️ Node.js instalado (Download)

✔️ MySQL instalado e em execução

✔️ Editor de código (VS Code, por exemplo)

🏗️ Como Configurar o Banco de Dados
Abra seu gerenciador MySQL (DBeaver, Workbench, phpMyAdmin ou terminal).

Crie um banco de dados:

sql
Copiar
Editar
CREATE DATABASE gerenciador_livros;
Crie a tabela:

sql
Copiar
Editar
CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    ano_publicacao INT NOT NULL,
    genero VARCHAR(100) NOT NULL,
    numero_paginas INT NOT NULL,
    sinopse TEXT,
    isbn VARCHAR(50) UNIQUE NOT NULL
);
🔑 Configuração do Backend (API)
Acesse a pasta do backend:

bash
Copiar
Editar
cd backend
Crie um arquivo .env com as informações do seu banco:

ini
Copiar
Editar
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=gerenciador_livros
DB_PORT=3306
Instale as dependências:

bash
Copiar
Editar
npm install
Rode o backend:

bash
Copiar
Editar
npm start
O backend iniciará normalmente na porta 3000, a não ser que tenha sido configurado diferente no código.

🌐 Executando o Frontend
Vá até a pasta frontend.

Abra o arquivo index.html no seu navegador (clique duas vezes ou botão direito → abrir com → navegador).

A interface estará pronta para uso e se comunicando com o backend via HTTP.

📑 Funcionalidades
✅ Adicionar livros: título, autor, ano, gênero, número de páginas, sinopse e ISBN.

🔍 Consultar livros: por autor, gênero, ano, ISBN ou listar todos.

🔄 Atualizar livros: atualiza qualquer informação com base no ISBN.

❌ Deletar livros: remove um livro informando o ISBN.

📊 Consultas avançadas: listar os 10 livros com mais ou menos páginas.

🐛 Possíveis Problemas
Se o frontend não funcionar, confira se o backend está rodando.

Se aparecer erro de conexão, verifique se o MySQL está ativo e se os dados no .env estão corretos.

As requisições são feitas para http://localhost:3000 no backend.

💡 Melhorias Futuras (Sugestões)
Implementar autenticação de usuários.

Deploy do backend com banco na nuvem.

Melhorias no layout com CSS Framework (Bootstrap, Tailwind).

Adicionar paginação nas consultas.

🤝 Contribuições
Sinta-se à vontade para fazer um fork, abrir issues ou enviar pull requests. Toda contribuição é bem-vinda!

🧠 Autor
Feito por SatanHimself-7
🔗 Meu GitHub


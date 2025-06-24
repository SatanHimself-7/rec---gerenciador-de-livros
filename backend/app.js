const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

db.connectDB();

app.get("/", (req, res) => {
  res.send("API de Livros MongoDB funcionando!");
});

app.post("/livros", async (req, res) => {
  try {
    const newBook = req.body;
    if (!newBook.ISBN) {
      return res
        .status(400)
        .json({ message: "O ISBN é obrigatório para inserir um livro." });
    }
    const result = await db.insertBook(newBook);
    res.status(201).json({
      message: "Livro inserido com sucesso!",
      insertedId: result.insertedId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao inserir livro", error: error.message });
  }
});

app.put("/livros/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const updateData = req.body;
    const result = await db.updateBook(isbn, updateData);

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Livro não encontrado com o ISBN fornecido." });
    }
    res.status(200).json({
      message: "Livro atualizado com sucesso!",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar livro", error: error.message });
  }
});

app.delete("/livros/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const result = await db.deleteBook(isbn);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Livro não encontrado com o ISBN fornecido." });
    }
    res.status(200).json({
      message: "Livro deletado com sucesso!",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar livro", error: error.message });
  }
});

app.get("/livros", async (req, res) => {
  try {
    const books = await db.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar todos os livros",
      error: error.message,
    });
  }
});

app.get("/livros/autor/:author", async (req, res) => {
  try {
    const author = req.params.author;
    const books = await db.getBooksByAuthor(author);
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum livro encontrado para este autor." });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar livros por autor",
      error: error.message,
    });
  }
});

app.get("/livros/genero/:genre", async (req, res) => {
  try {
    const genre = req.params.genre;
    const books = await db.getBooksByGenre(genre);
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum livro encontrado para este gênero." });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar livros por gênero",
      error: error.message,
    });
  }
});

app.get("/livros/ano/:year", async (req, res) => {
  try {
    const year = req.params.year;
    const books = await db.getBooksByPublicationYear(year);
    if (books.length === 0) {
      return res.status(404).json({
        message: "Nenhum livro encontrado para este ano de publicação.",
      });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar livros por ano de publicação",
      error: error.message,
    });
  }
});

app.get("/livros/mais-paginas", async (req, res) => {
  try {
    const books = await db.getTop10MostPages();
    if (books.length === 0) {
      return res.status(404).json({ message: "Nenhum livro encontrado." });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar livros com mais páginas",
      error: error.message,
    });
  }
});

app.get("/livros/menos-paginas", async (req, res) => {
  try {
    const books = await db.getTop10LeastPages();
    if (books.length === 0) {
      return res.status(404).json({ message: "Nenhum livro encontrado." });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar livros com menos páginas",
      error: error.message,
    });
  }
});

app.get("/livros/isbn/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = await db.getBookByISBN(isbn);
    if (!book) {
      return res
        .status(404)
        .json({ message: "Livro não encontrado com o ISBN fornecido." });
    }
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar livro por ISBN", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log("Rotas disponíveis:");
  console.log(`POST   /livros                     - Inserir novo livro`);
  console.log(`PUT    /livros/:isbn               - Atualizar livro por ISBN`);
  console.log(`DELETE /livros/:isbn              - Deletar livro por ISBN`);
  console.log(`GET    /livros                     - Listar todos os livros`);
  console.log(`GET    /livros/autor/:author       - Listar livros por autor`);
  console.log(`GET    /livros/genero/:genre       - Listar livros por gênero`);
  console.log(
    `GET    /livros/ano/:year           - Listar livros por ano de publicação`,
  );
  console.log(
    `GET    /livros/mais-paginas        - Listar os 10 livros com mais páginas`,
  );
  console.log(
    `GET    /livros/menos-paginas       - Listar os 10 livros com menos páginas`,
  );
  console.log(`GET    /livros/isbn/:isbn          - Buscar livro por ISBN`);
});

process.on("SIGINT", async () => {
  await db.closeDB();
  process.exit(0);
});

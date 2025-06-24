const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

let client;
let db;

async function connectDB() {
  if (db) {
    return db; // Retorna a instância do DB se já estiver conectada
  }
  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db(dbName);
    console.log("Conectado ao MongoDB!");
    return db;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Sai do processo em caso de erro na conexão
  }
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log("Conexão com o MongoDB fechada.");
    client = null;
    db = null;
  }
}

// --- Funções CRUD ---

async function insertBook(bookData) {
  const database = await connectDB();
  const collection = database.collection("livros");
  const result = await collection.insertOne(bookData);
  return result;
}

async function updateBook(isbn, updateData) {
  const database = await connectDB();
  const collection = database.collection("livros");
  const result = await collection.updateOne(
    { ISBN: isbn },
    { $set: updateData },
  );
  return result;
}

async function deleteBook(isbn) {
  const database = await connectDB();
  const collection = database.collection("livros");
  const result = await collection.deleteOne({ ISBN: isbn });
  return result;
}

// --- Funções de Consulta ---

async function getAllBooks() {
  const database = await connectDB();
  const collection = database.collection("livros");
  const books = await collection.find({}).toArray();
  return books;
}

async function getBooksByAuthor(author) {
  const database = await connectDB();
  const collection = database.collection("livros");
  const books = await collection.find({ Autor: author }).toArray();
  return books;
}

async function getBooksByGenre(genre) {
  const database = await connectDB();
  const collection = database.collection("livros");
  const books = await collection.find({ Genero: genre }).toArray();
  return books;
}

async function getBooksByPublicationYear(year) {
  const database = await connectDB();
  const collection = database.collection("livros");
  // Certifique-se de que o campo 'Ano de publicação' seja numérico para comparações
  const books = await collection
    .find({ "Ano de publicação": parseInt(year) })
    .toArray();
  return books;
}

async function getTop10MostPages() {
  const database = await connectDB();
  const collection = database.collection("livros");
  const books = await collection
    .find({})
    .sort({ "Número de páginas": -1 }) // -1 para ordem decrescente (mais páginas)
    .limit(10)
    .toArray();
  return books;
}

async function getTop10LeastPages() {
  const database = await connectDB();
  const collection = database.collection("livros");
  const books = await collection
    .find({})
    .sort({ "Número de páginas": 1 }) // 1 para ordem crescente (menos páginas)
    .limit(10)
    .toArray();
  return books;
}

async function getBookByISBN(isbn) {
  const database = await connectDB();
  const collection = database.collection("livros");
  const book = await collection.findOne({ ISBN: isbn });
  return book;
}

module.exports = {
  connectDB,
  closeDB,
  insertBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getBooksByAuthor,
  getBooksByGenre,
  getBooksByPublicationYear,
  getTop10MostPages,
  getTop10LeastPages,
  getBookByISBN,
};

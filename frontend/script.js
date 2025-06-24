const API_URL = "http://localhost:3000/livros";

function showMessage(elementId, message, type = "info") {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.className = `message ${type}`;
  setTimeout(() => {
    element.textContent = "";
    element.className = "message";
  }, 5000);
}

function clearBooksList() {
  document.getElementById("booksList").innerHTML = "";
}

function displayBooks(books) {
  const booksListDiv = document.getElementById("booksList");
  clearBooksList();

  if (books.length === 0) {
    booksListDiv.innerHTML = "<p>Nenhum livro encontrado.</p>";
    return;
  }

  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.innerHTML = `
            <p><strong>Título:</strong> ${book.Título}</p>
            <p><strong>Autor:</strong> ${book.Autor}</p>
            <p><strong>Ano de Publicação:</strong> ${book["Ano de publicação"]}</p>
            <p><strong>Gênero:</strong> ${book.Genero}</p>
            <p><strong>Páginas:</strong> ${book["Número de páginas"]}</p>
            <p><strong>Sinopse:</strong> ${book.Sinopse}</p>
            <p><strong>ISBN:</strong> ${book.ISBN}</p>
        `;
    booksListDiv.appendChild(bookItem);
  });
}

document.getElementById("addBookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const bookData = {
    Título: document.getElementById("addTitulo").value,
    Autor: document.getElementById("addAutor").value,
    "Ano de publicação": parseInt(
      document.getElementById("addAnoPublicacao").value,
    ),
    Genero: document.getElementById("addGenero").value,
    "Número de páginas": parseInt(
      document.getElementById("addNumeroPaginas").value,
    ),
    Sinopse: document.getElementById("addSinopse").value,
    ISBN: document.getElementById("addIsbn").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    const data = await response.json();
    if (response.ok) {
      showMessage("addMessage", data.message, "success");
      e.target.reset();
    } else {
      showMessage("addMessage", `Erro: ${data.message}`, "error");
    }
  } catch (error) {
    showMessage("addMessage", `Erro de conexão: ${error.message}`, "error");
  }
});

document
  .getElementById("updateBookForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const isbnToUpdate = document.getElementById("updateIsbn").value;
    const updateData = {};

    const fields = [
      "updateTitulo",
      "updateAutor",
      "updateAnoPublicacao",
      "updateGenero",
      "updateNumeroPaginas",
      "updateSinopse",
    ];
    fields.forEach((fieldId) => {
      const element = document.getElementById(fieldId);
      if (element.value) {
        if (
          fieldId === "updateAnoPublicacao" ||
          fieldId === "updateNumeroPaginas"
        ) {
          updateData[
            element.placeholder.replace("Novo ", "").replace(" (opcional)", "")
          ] = parseInt(element.value);
        } else {
          updateData[
            element.placeholder.replace("Novo ", "").replace(" (opcional)", "")
          ] = element.value;
        }
      }
    });

    if (Object.keys(updateData).length === 0) {
      showMessage(
        "updateMessage",
        "Preencha pelo menos um campo para atualizar.",
        "info",
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${isbnToUpdate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      if (response.ok) {
        showMessage("updateMessage", data.message, "success");
        e.target.reset();
      } else {
        showMessage("updateMessage", `Erro: ${data.message}`, "error");
      }
    } catch (error) {
      showMessage(
        "updateMessage",
        `Erro de conexão: ${error.message}`,
        "error",
      );
    }
  });

document
  .getElementById("deleteBookForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const isbnToDelete = document.getElementById("deleteIsbn").value;

    try {
      const response = await fetch(`${API_URL}/${isbnToDelete}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        showMessage("deleteMessage", data.message, "success");
        e.target.reset();
      } else {
        showMessage("deleteMessage", `Erro: ${data.message}`, "error");
      }
    } catch (error) {
      showMessage(
        "deleteMessage",
        `Erro de conexão: ${error.message}`,
        "error",
      );
    }
  });

document.getElementById("getAllBooks").addEventListener("click", async () => {
  try {
    const response = await fetch(API_URL);
    const books = await response.json();
    if (response.ok) {
      displayBooks(books);
      showMessage(
        "queryMessage",
        "Todos os livros listados com sucesso.",
        "success",
      );
    } else {
      showMessage("queryMessage", `Erro: ${books.message}`, "error");
      clearBooksList();
    }
  } catch (error) {
    showMessage("queryMessage", `Erro de conexão: ${error.message}`, "error");
    clearBooksList();
  }
});

document
  .getElementById("getBooksByAuthor")
  .addEventListener("click", async () => {
    const author = document.getElementById("queryAutor").value;
    if (!author) {
      showMessage(
        "queryMessage",
        "Por favor, digite um autor para buscar.",
        "info",
      );
      clearBooksList();
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}/autor/${encodeURIComponent(author)}`,
      );
      const books = await response.json();
      if (response.ok) {
        displayBooks(books);
        showMessage(
          "queryMessage",
          `Livros do autor "${author}" listados.`,
          "success",
        );
      } else {
        showMessage("queryMessage", `Erro: ${books.message}`, "error");
        clearBooksList();
      }
    } catch (error) {
      showMessage("queryMessage", `Erro de conexão: ${error.message}`, "error");
      clearBooksList();
    }
  });

document
  .getElementById("getBooksByGenre")
  .addEventListener("click", async () => {
    const genre = document.getElementById("queryGenero").value;
    if (!genre) {
      showMessage(
        "queryMessage",
        "Por favor, digite um gênero para buscar.",
        "info",
      );
      clearBooksList();
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}/genero/${encodeURIComponent(genre)}`,
      );
      const books = await response.json();
      if (response.ok) {
        displayBooks(books);
        showMessage(
          "queryMessage",
          `Livros do gênero "${genre}" listados.`,
          "success",
        );
      } else {
        showMessage("queryMessage", `Erro: ${books.message}`, "error");
        clearBooksList();
      }
    } catch (error) {
      showMessage("queryMessage", `Erro de conexão: ${error.message}`, "error");
      clearBooksList();
    }
  });

document
  .getElementById("getBooksByYear")
  .addEventListener("click", async () => {
    const year = document.getElementById("queryAno").value;
    if (!year) {
      showMessage(
        "queryMessage",
        "Por favor, digite um ano para buscar.",
        "info",
      );
      clearBooksList();
      return;
    }
    try {
      const response = await fetch(`${API_URL}/ano/${year}`);
      const books = await response.json();
      if (response.ok) {
        displayBooks(books);
        showMessage(
          "queryMessage",
          `Livros publicados em ${year} listados.`,
          "success",
        );
      } else {
        showMessage("queryMessage", `Erro: ${books.message}`, "error");
        clearBooksList();
      }
    } catch (error) {
      showMessage("queryMessage", `Erro de conexão: ${error.message}`, "error");
      clearBooksList();
    }
  });

document.getElementById("getMostPages").addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_URL}/mais-paginas`);
    const books = await response.json();
    if (response.ok) {
      displayBooks(books);
      showMessage(
        "queryMessage",
        "10 livros com mais páginas listados.",
        "success",
      );
    } else {
      showMessage("queryMessage", `Erro: ${books.message}`, "error");
      clearBooksList();
    }
  } catch (error) {
    showMessage("queryMessage", `Erro de conexão: ${error.message}`, "error");
    clearBooksList();
  }
});

document.getElementById("getLeastPages").addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_URL}/menos-paginas`);
    const books = await response.json();
    if (response.ok) {
      displayBooks(books);
      showMessage(
        "queryMessage",
        "10 livros com menos páginas listados.",
        "success",
      );
    } else {
      showMessage("queryMessage", `Erro: ${books.message}`, "error");
      clearBooksList();
    }
  } catch (error) {
    showMessage("queryMessage", `Erro de conexão: ${error.message}`, "error");
    clearBooksList();
  }
});

document.getElementById("getBookByIsbn").addEventListener("click", async () => {
  const isbn = document.getElementById("queryIsbn").value;
  if (!isbn) {
    showMessage(
      "queryMessage",
      "Por favor, digite um ISBN para buscar.",
      "info",
    );
    clearBooksList();
    return;
  }
  try {
    const response = await fetch(`${API_URL}/isbn/${isbn}`);
    const book = await response.json();
    if (response.ok) {
      displayBooks(book ? [book] : []);
      showMessage(
        "queryMessage",
        `Livro com ISBN "${isbn}" encontrado.`,
        "success",
      );
    } else {
      showMessage("queryMessage", `Erro: ${book.message}`, "error");
      clearBooksList();
    }
  } catch (error) {
    showMessage("queryMessage", `Erro de conexão: ${error.message}`, "error");
    clearBooksList();
  }
});

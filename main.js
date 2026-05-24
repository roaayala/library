import createBookCard from "./BookCard.js";
import { BookController } from "./BookController.js";
import createEmptyMessage from "./EmptyMessage.js";
import { toggleDialog } from "./utils/dialogManager.js";
import { getFormData, resetForm } from "./utils/formHandler.js";

let library = [];
let activeBook = null;

const addFormSelectors = {
    title: "#bookTitle",
    author: "#bookAuthor",
    pages: "#bookPages",
    status: "#bookStatus",
};

const editFormSelectors = {
    title: "#editBookTitle",
    author: "#editBookAuthor",
    pages: "#editBookPages",
    status: "#editBookStatus",
};

const booksContainer = document.querySelector(".books");

// add book dialog
document.querySelector("#showAddBookDialog").addEventListener("click", () => {
    toggleDialog("#addBookDialog", "open");
});

document.querySelector("#cancelAddBook").addEventListener("click", () => {
    toggleDialog("#addBookDialog", "close");
    resetForm(addFormSelectors);
});

document.querySelector("#addBook").addEventListener("click", (e) => {
    e.preventDefault();

    // get form data

    const newBook = getFormData(addFormSelectors);
    library = BookController.addBook(library, newBook);

    toggleDialog("#addBookDialog", "close");
    resetForm(addFormSelectors);

    renderApp();
});

// handle new book
// handle edit book

const renderApp = () => {
    booksContainer.innerHTML = "";

    if (library.length === 0) {
        booksContainer.appendChild(createEmptyMessage());
        return;
    }

    library.forEach((book) => {
        booksContainer.appendChild(createBookCard(book));
    });
};

renderApp();

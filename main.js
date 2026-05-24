import createBookCard from "./BookCard.js";
import { BookController } from "./BookController.js";
import createEmptyMessage from "./EmptyMessage.js";
import { toggleDialog } from "./utils/dialogManager.js";

let library = [];
let activeBook = null;

const addFormSelectors = {
    title: "bookTitle",
    author: "bookAuthor",
    pages: "bookPages",
    status: "bookStatus",
};

const editFormSelectors = {
    title: "editBookTitle",
    author: "editBookAuthor",
    pages: "editBookPages",
    status: "editBookStatus",
};

const booksContainer = document.querySelector(".books");

// show add book dialog
document.querySelector("#showAddBookDialog").addEventListener("click", () => {
    toggleDialog("#addBookDialog", "open");
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
        booksContainer.appendChild(createBookCard({ book }));
    });
};

renderApp();

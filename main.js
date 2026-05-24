import { BookController } from "./BookController.js";
import createEmptyMessage from "./EmptyMessage.js";

let library = [];
let activeBook = null;

// CONTAINER
const booksContainer = document.querySelector(".books");

const renderApp = () => {
    if (library.length === 0) {
        booksContainer.appendChild(createEmptyMessage());
        return;
    }

    library.forEach((book) => {});
};

renderApp();

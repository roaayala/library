import createBookCard from "./BookCard.js";
import { BookController } from "./BookController.js";
import createEmptyMessage from "./EmptyMessage.js";
import { toggleDialog } from "./utils/dialogManager.js";
import { getFormData, resetForm, setFormData } from "./utils/formHandler.js";

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

// show add book dialog
document.querySelector("#showAddBookDialog").addEventListener("click", () => {
    toggleDialog("#addBookDialog", "open");
});

// close add book dialog
document.querySelector("#cancelAddBook").addEventListener("click", () => {
    toggleDialog("#addBookDialog", "close");
    resetForm(addFormSelectors);
});

// save book
document.querySelector("#addBook").addEventListener("click", (e) => {
    e.preventDefault();

    // get form data
    const newBook = getFormData(addFormSelectors);
    library = BookController.addBook(library, newBook);

    toggleDialog("#addBookDialog", "close");
    resetForm(addFormSelectors);

    renderApp();
});

booksContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".book");

    if (!card) {
        return;
    }

    const targetId = card.getAttribute("data-book-id");

    if (e.target.closest(".delete")) {
        library = BookController.removeBook(library, targetId);
        renderApp();
    }

    if (e.target.closest(".edit")) {
        activeBook = targetId;

        const book = library.find((book) => book.id === targetId);

        console.log(book);
        setFormData({ selector: editFormSelectors, data: book });

        toggleDialog("#editBookDialog", "open");
    }
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

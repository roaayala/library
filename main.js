import createBookCard from "./components/BookCard.js";
import { BookController } from "./controllers/BookController.js";
import createEmptyMessage from "./components/EmptyMessage.js";
import { toggleDialog } from "./utils/dialogManager.js";
import { getFormData, resetForm, setFormData } from "./utils/formHandler.js";

let library = [];
let activeBook = null;

const booksContainer = document.querySelector(".books");

const addFormSelectors = {
    title: "#bookTitle",
    author: "#bookAuthor",
    pages: "#bookPages",
    status: "#bookStatus",
};

document
    .querySelector(addFormSelectors.title)
    .addEventListener("input", (e) => {
        if (e.target.value.trim("").length < 1) {
            e.target.style.backgroundColor = "salmon";
        }
    });

const editFormSelectors = {
    title: "#editBookTitle",
    author: "#editBookAuthor",
    pages: "#editBookPages",
    status: "#editBookStatus",
};

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

// save edit book
document.querySelector("#editBook").addEventListener("click", (e) => {
    e.preventDefault();

    const editedBook = getFormData(editFormSelectors);

    library = BookController.editBook(library, activeBook, editedBook);

    activeBook = null;

    toggleDialog("#editBookDialog", "close");
    resetForm(editFormSelectors);
    renderApp();
});

// cancel edit book
document.querySelector("#cancelEditBook").addEventListener("click", () => {
    toggleDialog("#editBookDialog", "close");
    resetForm(editFormSelectors);
});

booksContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".book");

    if (!card) {
        return;
    }

    const targetId = card.getAttribute("data-book-id");

    // delete book
    if (e.target.closest(".delete")) {
        library = BookController.removeBook(library, targetId);
        renderApp();
    }

    // show edit book dialog
    if (e.target.closest(".edit")) {
        activeBook = targetId;

        const book = library.find((book) => book.id === targetId);
        setFormData({ selector: editFormSelectors, data: book });

        toggleDialog("#editBookDialog", "open");
    }
});

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

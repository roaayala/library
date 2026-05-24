import createBook from "./Book.js";
i;
class Library {
    constructor() {
        this.library = [];
        this.editTargetId = null;

        this.dialogManager = new DialogManager();

        this.addForm = new FormHandler(
            "#bookTitle",
            "#bookAuthor",
            "#bookPages",
            "#bookStatus",
            "#addBook",
            "#cancelAddBook",
        );

        this.editForm = new FormHandler(
            "#editBookTitle",
            "#editBookAuthor",
            "#editBookPages",
            "#editBookStatus",
            "#editBook",
            "#cancelEditBook",
        );

        this.bookRenderer = new BookRenderer(".books");

        this.init();
    }

    init() {
        this.dialogManager.init();

        this.addForm.onSubmit((data) => {
            const book = createBook(
                data.title,
                data.author,
                data.pages,
                data.status,
            );

            this.library.push(book);

            this.dialogManager.closeAddDialog();

            this.bookRenderer.renderAllBooks(this.library);
        });

        this.addForm.onCancel(() => {
            this.dialogManager.closeAddDialog();
            this.addForm.resetFormInput();
        });

        this.editForm.onSubmit((data) => {
            const oldBook = this.library.find(
                (book) => book.id === this.editTargetId,
            );

            oldBook.title = data.title;
            oldBook.author = data.author;
            oldBook.pages = data.pages;
            oldBook.status = data.status;

            this.editTargetId = null;

            this.dialogManager.closeEditDialog();
            this.bookRenderer.renderAllBooks(this.library);
        });

        this.editForm.onCancel(() => {
            this.dialogManager.closeEditDialog();
            this.editForm.resetFormInput();
        });

        this.bookRenderer.renderAllBooks(this.library);

        this.bookRenderer.onActionClick("action-edit", (targetId) => {
            const oldBook = this.library.find((book) => book.id === targetId);

            this.editTargetId = targetId;

            this.editForm.setFormData(oldBook);

            this.dialogManager.openEditDialog();
        });

        this.bookRenderer.onActionClick("action-delete", (targetId) => {
            // exclude book with targeted id
            this.library = this.library.filter((book) => book.id !== targetId);

            this.bookRenderer.renderAllBooks(this.library);
        });
    }
}

class FormHandler {
    constructor(
        inputTitle,
        inputAuthor,
        inputPages,
        inputStatus,
        submitButton,
        hideButton,
    ) {
        this.inputTitle = document.querySelector(inputTitle);
        this.inputAuthor = document.querySelector(inputAuthor);
        this.inputPages = document.querySelector(inputPages);
        this.inputStatus = document.querySelector(inputStatus);

        this.submitButton = document.querySelector(submitButton);
        this.hideDialog = document.querySelector(hideButton);
    }

    setFormData(oldBookObject) {
        this.inputTitle.value = oldBookObject.title;

        this.inputAuthor.value = oldBookObject.author;

        this.inputPages.value = oldBookObject.pages;

        this.inputStatus.value = oldBookObject.status;
    }

    getFormData() {
        return {
            title: this.inputTitle.value,
            author: this.inputAuthor.value,
            pages: this.inputPages.value,
            status: this.inputStatus.value,
        };
    }

    onSubmit(func) {
        this.submitButton.addEventListener("click", (e) => {
            e.preventDefault();

            const data = this.getFormData();

            func(data);

            this.resetFormInput();
        });
    }

    onCancel(func) {
        this.hideDialog.addEventListener("click", () => {
            func();
        });
    }

    resetFormInput() {
        this.inputTitle.value = "";
        this.inputAuthor.value = "";
        this.inputPages.value = "";
        this.inputStatus.value = "waiting";
    }
}

class DialogManager {
    constructor() {
        this.addDialog = document.querySelector("#addBookDialog");
        this.showAddDialog = document.querySelector("#showAddBookDialog");

        this.editDialog = document.querySelector("#editBookDialog");
    }

    init() {
        this.showAddDialog.addEventListener("click", () => {
            this.addDialog.showModal();
        });
    }

    openEditDialog() {
        this.editDialog.showModal();
    }

    closeEditDialog() {
        this.editDialog.close();
    }

    closeAddDialog() {
        this.addDialog.close();
    }
}

class BookRenderer {
    constructor(container) {
        this.booksContainer = document.querySelector(container);
    }

    renderBook(bookObject) {
        this.booksContainer.appendChild(this.book(bookObject));
    }

    renderAllBooks(libraryArray) {
        this.clearShelf();

        if (libraryArray.length === 0) {
            this.showEmptyMessage();
            return;
        }

        libraryArray.forEach((book) => {
            this.renderBook(book);
        });
    }

    onActionClick(targetClassName, func) {
        this.booksContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains(targetClassName)) {
                const id = e.target
                    .closest("[book-id]")
                    .getAttribute("book-id");
                func(id);
            }
        });
    }

    showEmptyMessage() {
        const emptyMessage = document.createElement("div");

        emptyMessage.classList.add("book-card-empty");

        emptyMessage.textContent = `There's no book being added.`;

        this.booksContainer.appendChild(emptyMessage);
    }

    clearShelf() {
        this.booksContainer.innerHTML = "";
    }
}

const app = new Library();

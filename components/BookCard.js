export default function createBookCard({ id, title, author, pages, status }) {
    const book = document.createElement("div");
    book.className = "book";

    // title
    const bookTitle = document.createElement("h2");
    bookTitle.className = "book-title";
    bookTitle.textContent = title;
    book.appendChild(bookTitle);

    // author
    const bookAuthor = document.createElement("h3");
    bookAuthor.className = "book-author";
    bookAuthor.textContent = author;
    book.appendChild(bookAuthor);

    // pages
    const bookPages = document.createElement("p");
    bookPages.className = "book-pages";
    bookPages.textContent = `${pages} pages`;
    book.appendChild(bookPages);

    // status
    const bookStatus = document.createElement("span");
    bookStatus.className = "book-status";
    bookStatus.textContent = status;
    book.appendChild(bookStatus);

    // ACTIONS
    const bookActionsContainer = document.createElement("div");
    bookActionsContainer.className = "book-card-actions";

    // delete
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    bookActionsContainer.appendChild(deleteButton);

    // edit
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit";
    bookActionsContainer.appendChild(editButton);

    book.appendChild(bookActionsContainer);
    book.setAttribute("data-book-id", id);

    return book;
}

const books = document.querySelector('.books');
const addBookDialog = document.querySelector('#addBookDialog');
const showAddBookDialog = document.querySelector('#showAddBookDialog');
const bookTitleInput = document.querySelector('#bookTitle');
const bookAuthorInput = document.querySelector('#bookAuthor');
const bookPagesInput = document.querySelector('#bookPages');
const bookStatusInput = document.querySelector('#bookStatus');
const addBook = document.querySelector('#addBook');
const cancelAddBook = document.querySelector('#cancelAddBook');

showAddBookDialog.addEventListener('click', () => {
	addBookDialog['open'] ? addBookDialog.close() : addBookDialog.show();

	resetFormInput();
});

addBook.addEventListener('click', (e) => {
	e.preventDefault();
	logFormInput();
	resetFormInput();
	addBookDialog.close();
});

cancelAddBook.addEventListener('click', () => {
	resetFormInput();
	addBookDialog.close();
});

const myLibrary = [];

function logFormInput() {
	console.log(bookTitleInput.value);
	console.log(bookAuthorInput.value);
	console.log(bookPagesInput.value);
	console.log(bookStatusInput.value);
}

function resetFormInput() {
	bookTitleInput.value = null;
	bookAuthorInput.value = null;
	bookPagesInput.value = null;
	bookStatusInput.value = 'waiting';
}

function conditionalyRenderBooks() {
	if (myLibrary.length > 0) {
		renderBooks();
	} else {
		renderEmptyBooks();
	}
}

conditionalyRenderBooks();

function renderEmptyBooks() {
	const bookCardEmpty = document.createElement('div');
	bookCardEmpty.classList.add('book-card-empty');
	bookCardEmpty.textContent = `There's no book being added.`;
	books.appendChild(bookCardEmpty);
}

function renderBooks() {
	myLibrary.forEach((book) => {
		const bookCard = document.createElement('div');
		bookCard.classList.add('book');

		const bookAuthor = document.createElement('h3');
		bookAuthor.classList.add('book-author');
		bookAuthor.textContent = book.author;

		const bookTitle = document.createElement('h2');
		bookTitle.classList.add('book-title');
		bookTitle.textContent = book.title;

		const bookPages = document.createElement('p');
		bookPages.classList.add('book-pages');
		bookPages.textContent = `${book.pages} pages`;

		const bookReadStatus = document.createElement('span');
		bookReadStatus.classList.add('book-read-status');
		bookReadStatus.textContent = book.status;

		bookCard.appendChild(bookAuthor);
		bookCard.appendChild(bookTitle);
		bookCard.appendChild(bookPages);
		bookCard.appendChild(bookReadStatus);
		books.appendChild(bookCard);
	});
}

function Book(id, title, author, pages, status) {
	this.id = id;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.status = status;
}

function addBookToLibrary() {}

function generateBookId() {
	return crypto.randomUUID();
}

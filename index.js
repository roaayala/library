const books = document.querySelector('.books');
const addBookDialog = document.querySelector('#addBookDialog');
const showAddBookDialog = document.querySelector('#showAddBookDialog');
const bookTitleInput = document.querySelector('#bookTitle');
const bookAuthorInput = document.querySelector('#bookAuthor');
const bookPagesInput = document.querySelector('#bookPages');
const bookStatusInput = document.querySelector('#bookStatus');
const addBook = document.querySelector('#addBook');
const cancelAddBook = document.querySelector('#cancelAddBook');
const editBookDialog = document.querySelector('#editBookDialog');
const showEditBookDialog = document.querySelector('#showEditBookDialog');
const editBookTitleInput = document.querySelector('#editBookTitle');
const editBookAuthorInput = document.querySelector('#editBookAuthor');
const editBookPagesInput = document.querySelector('#editBookPages');
const editBookStatusInput = document.querySelector('#editBookStatus');
const editBook = document.querySelector('#editBook');
const cancelEditBook = document.querySelector('#cancelEditBook');

const myLibrary = [];

showAddBookDialog.addEventListener('click', () => {
	addBookDialog['open'] ? addBookDialog.close() : addBookDialog.show();

	resetFormInput();
});

addBook.addEventListener('click', (e) => {
	e.preventDefault();
	// logFormInput();
	addBookToLibrary(
		bookTitleInput.value,
		bookAuthorInput.value,
		bookPagesInput.value,
		bookStatusInput.value,
	);
	resetFormInput();
	addBookDialog.close();
	books.innerHTML = '';
	conditionalyRenderBooks();
});

cancelAddBook.addEventListener('click', () => {
	resetFormInput();
	addBookDialog.close();
});

editBook.addEventListener('click', (e) => {
	e.preventDefault();
	// console.log(editBookDialog.getAttribute('book-id'));
	const bookId = editBookDialog.getAttribute('book-id');
	editBookToLibrary(
		bookId,
		editBookTitleInput.value,
		editBookAuthorInput.value,
		editBookPagesInput.value,
		editBookStatusInput.value,
	);

	resetFormInput();
	editBookDialog.close();
	books.innerHTML = '';
	conditionalyRenderBooks();
});

cancelEditBook.addEventListener('click', () => {
	resetFormInput();
	editBookDialog.close();
});

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
		bookCard.setAttribute('book-id', book.id);

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

		const bookCardActions = document.createElement('div');
		bookCardActions.classList.add('book-card-actions');

		const actionEdit = document.createElement('button');
		actionEdit.classList.add('action-edit');
		actionEdit.textContent = 'Edit';

		actionEdit.addEventListener('click', () => {
			if (editBookDialog['open']) {
				editBookDialog.close();
			} else {
				editBookDialog.show();
				// console.log(book.id);
				editBookDialog.setAttribute('book-id', book.id);
				editBookTitleInput.value = book.title;
				editBookAuthorInput.value = book.author;
				editBookPagesInput.value = book.pages;
				editBookStatusInput.value = book.status;
			}
		});

		const actionDelete = document.createElement('button');
		actionDelete.classList.add('action-delete');
		actionDelete.textContent = 'Delete';

		actionDelete.addEventListener('click', (e) => {
			// const bookId =
			// 	e.target.parentElement.parentElement.getAttribute('book-id');

			const bookIndex = myLibrary.indexOf(book);

			if (bookIndex > -1) {
				myLibrary.splice(bookIndex, 1);
				books.innerHTML = '';
				conditionalyRenderBooks();
			}

			// console.log(bookIndex);
		});

		bookCard.appendChild(bookAuthor);
		bookCard.appendChild(bookTitle);
		bookCard.appendChild(bookPages);
		bookCard.appendChild(bookReadStatus);

		bookCard.appendChild(bookCardActions);
		bookCardActions.appendChild(actionEdit);
		bookCardActions.appendChild(actionDelete);

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

function addBookToLibrary(title, author, pages, status) {
	const book = new Book(generateBookId(), title, author, pages, status);
	// console.log(book);
	myLibrary.push(book);
}

function editBookToLibrary(id, title, author, pages, status) {
	const editedBook = new Book(id, title, author, pages, status);

	const bookIndex = myLibrary.findIndex((book) => book.id === editedBook.id);

	// console.log(bookIndex, editedBook);
	myLibrary[bookIndex] = editedBook;
}

function generateBookId() {
	return crypto.randomUUID();
}

class Library {}

class Book {
	constructor(title, author, pages, status) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.status = status;
	}
}

class FormHandler {}

class DialogManager {}

class BookRenderer {}

class Library {
	constructor() {
		this.library = [];

		this.dialogManager = new DialogManager();

		this.addForm = new FormHandler(
			'#bookTitle',
			'#bookAuthor',
			'#bookPages',
			'#bookStatus',
			'#addBook',
			'#cancelAddBook',
		);

		this.bookRenderer = new BookRenderer('.books');

		this.init();
	}

	init() {
		this.dialogManager.init();

		this.addForm.onSubmit((data) => {
			const book = new Book(data.title, data.author, data.pages, data.status);

			this.library.push(book);

			this.dialogManager.closeAddDialog();

			this.bookRenderer.renderAllBooks(this.library);
		});

		this.addForm.onCancel(() => {
			this.dialogManager.closeAddDialog();
			this.addForm.resetFormInput();
		});

		this.bookRenderer.renderAllBooks(this.library);

		this.bookRenderer.actionDelete((target) => {
			console.log(target);
		});
	}
}

class Book {
	constructor(title, author, pages, status) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.status = status;
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

	getFormData() {
		return {
			title: this.inputTitle.value,
			author: this.inputAuthor.value,
			pages: this.inputPages.value,
			status: this.inputStatus.value,
		};
	}

	onSubmit(func) {
		this.submitButton.addEventListener('click', (e) => {
			e.preventDefault();

			const data = this.getFormData();

			func(data);

			this.resetFormInput();
		});
	}

	onCancel(func) {
		this.hideDialog.addEventListener('click', () => {
			func();
		});
	}

	resetFormInput() {
		this.inputTitle.value = '';
		this.inputAuthor.value = '';
		this.inputPages.value = '';
		this.inputStatus.value = 'waiting';
	}
}

class DialogManager {
	constructor() {
		this.addDialog = document.querySelector('#addBookDialog');
		this.showAddDialog = document.querySelector('#showAddBookDialog');
	}

	init() {
		this.showAddDialog.addEventListener('click', () => {
			this.addDialog.showModal();
		});
	}

	closeAddDialog() {
		this.addDialog.close();
	}
}

class BookRenderer {
	constructor(container) {
		this.booksContainer = document.querySelector(container);
	}

	createTitle(title) {
		const bookTitle = document.createElement('h2');
		bookTitle.classList.add('book-title');
		bookTitle.textContent = title;

		return bookTitle;
	}

	createAuthor(author) {
		const bookAuthor = document.createElement('h3');
		bookAuthor.classList.add('book-author');
		bookAuthor.textContent = author;

		return bookAuthor;
	}

	createPages(pages) {
		const bookPages = document.createElement('p');
		bookPages.classList.add('book-pages');
		bookPages.textContent = `${pages} pages`;

		return bookPages;
	}

	createStatus(status) {
		const bookStatus = document.createElement('span');
		bookStatus.classList.add('book-read-status');
		bookStatus.textContent = status;

		return bookStatus;
	}

	createButton(style, text) {
		const actionButton = document.createElement('button');

		actionButton.classList.add(style);

		actionButton.textContent = text;

		return actionButton;
	}

	createBookActionsContainer() {
		const bookActionsContainer = document.createElement('div');

		bookActionsContainer.classList.add('book-card-actions');

		bookActionsContainer.appendChild(this.createButton('action-edit', 'Edit'));

		bookActionsContainer.appendChild(
			this.createButton('action-delete', 'Delete'),
		);

		return bookActionsContainer;
	}

	book(bookObject) {
		const book = document.createElement('div');
		book.classList.add('book');
		book.setAttribute('book-id', bookObject.id);

		book.appendChild(this.createAuthor(bookObject.author));
		book.appendChild(this.createTitle(bookObject.title));
		book.appendChild(this.createPages(bookObject.pages));
		book.appendChild(this.createStatus(bookObject.status));
		book.appendChild(this.createBookActionsContainer());

		return book;
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

	actionDelete(func) {
		this.booksContainer.addEventListener('click', (e) => {
			if (e.target.className === 'action-delete') {
				func(e.target);
			}
		});
	}

	showEmptyMessage() {
		const emptyMessage = document.createElement('div');

		emptyMessage.classList.add('book-card-empty');

		emptyMessage.textContent = `There's no book being added.`;

		this.booksContainer.appendChild(emptyMessage);
	}

	clearShelf() {
		this.booksContainer.innerHTML = '';
	}
}

const app = new Library();

class Library {
	constructor() {
		this.dialogManager = new DialogManager();
		this.addForm = new FormHandler(
			'#bookTitle',
			'#bookAuthor',
			'#bookPages',
			'#bookStatus',
			'#addBook',
			'#cancelAddBook',
		);

		this.init();
	}

	init() {
		this.dialogManager.init();
		this.addForm.onCancel(() => {
			this.dialogManager.closeAddDialog();
			this.addForm.resetFormInput();
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
		inputAuhor,
		inputPages,
		inputStatus,
		submitButton,
		hideButton,
	) {
		this.inputTitle = document.querySelector(inputTitle);
		this.inputAuhor = document.querySelector(inputAuhor);
		this.inputPages = document.querySelector(inputPages);
		this.inputStatus = document.querySelector(inputStatus);
		this.submitButton = document.querySelector(submitButton);
		this.hideDialog = document.querySelector(hideButton);
	}

	onCancel(func) {
		this.hideDialog.addEventListener('click', () => {
			func();
		});
	}

	resetFormInput() {
		this.inputTitle.value = '';
		this.inputAuhor.value = '';
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

class BookRenderer {}

const app = new Library();

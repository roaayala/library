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

		this.init();
	}

	init() {
		this.dialogManager.init();
		this.addForm.onSubmit((data) => {
			this.library.push(data);
			console.log(this.library);
			this.dialogManager.closeAddDialog();
		});

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

class BookRenderer {}

const app = new Library();

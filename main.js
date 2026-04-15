class Library {
	constructor() {
		this.dialogManager = new DialogManager();
		this.editForm = new FormHandler('cancelAddBook');

		this.init();
	}

	init() {
		this.dialogManager.init();
		this.editForm.onCancel(() => {
			this.dialogManager.closeAddDialog();
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
	constructor(hideHandler) {
		this.hideAddDialog = document.querySelector(`#${hideHandler}`);
	}

	onCancel(func) {
		this.hideAddDialog.addEventListener('click', () => {
			func();
		});
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

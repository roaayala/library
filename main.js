class Library {
	constructor() {
		this.dialogManager = new DialogManager();
		this.formHandler = new FormHandler();

		this.init();
	}

	init() {
		this.dialogManager.init();
		this.formHandler.onCancel(() => {
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
	constructor() {
		this.hideAddDialog = document.querySelector('#cancelAddBook');
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

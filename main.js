class Library {
	constructor() {
		this.dialogManager = new DialogManager();
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

class FormHandler {}

class DialogManager {
	constructor() {
		this.addDialog = document.querySelector('#addBookDialog');
		this.showAddDialog = document.querySelector('#showAddBookDialog');
		this.editDialog = document.querySelector('#editBookDialog');

		this.showAddDialog.addEventListener('click', () => {
			this.addDialog.showModal();
		});
	}
}

class BookRenderer {}

const app = new Library();

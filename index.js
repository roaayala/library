const myLibrary = [];

function Book(title, author, pages, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.status = status;
}

function addBookToLibrary() {}

function generateBookId() {
	return crypto.randomUUID();
}

console.log(generateBookId());

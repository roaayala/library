const books = document.querySelector('.books');

const myLibrary = [];

const myLibrarayDummies = [
	{
		title: 'Modern Front-End Web Development',
		author: 'Sarah Coder',
		pages: 320,
		status: 'Waiting',
	},
	{
		title: 'Personal Finance for Beginners',
		author: 'John Wealth',
		pages: 210,
		status: 'Reading',
	},
	{
		title: 'The 64px Grid: Icon Design Secrets',
		author: 'Vector Master',
		pages: 150,
		status: 'Finish',
	},
	{
		title: 'Ramadan Reflections',
		author: 'A. Scholar',
		pages: 120,
		status: 'Pending',
	},
	{
		title: 'The Olympic Dream',
		author: 'Sports Writer',
		pages: 280,
		status: 'Pending',
	},
	{
		title: 'A Guide to Moving and Living in Klaten',
		author: 'Indo Traveler',
		pages: 95,
		status: 'Finish',
	},
];

myLibrarayDummies.forEach((book) => {
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

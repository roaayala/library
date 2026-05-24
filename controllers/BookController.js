import createBook from "../models/Book.js";

const addBook = (libraryArray, dataObject) => {
    const { title, author, pages, status } = dataObject;

    const newBook = createBook({ title, author, pages, status });

    return [...libraryArray, newBook];
};

const removeBook = (libraryArray, id) => {
    return libraryArray.filter((book) => book.id !== id);
};

const editBook = (libraryArray, id, dataObject) => {
    return libraryArray.map((book) => {
        if (book.id === id) {
            return { ...book, ...dataObject };
        }
        return book;
    });
};

export const BookController = { addBook, removeBook, editBook };

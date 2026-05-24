export function resetForm({ title, author, pages, status }) {
    document.querySelector(title).value = "";
    document.querySelector(author).value = "";
    document.querySelector(pages).value = "";
    document.querySelector(status).value = "waiting";
}

export function getFormData({ title, author, pages, status }) {
    return {
        title: document.querySelector(title).value.trim(""),
        author: document.querySelector(author).value.trim(""),
        pages: Number(document.querySelector(pages).value),
        status: document.querySelector(status).value,
    };
}

export function resetForm({ title, author, pages, status }) {
    document.querySelector(title).value = "";
    document.querySelector(author).value = "";
    document.querySelector(pages).value = "";
    document.querySelector(status).value = "waiting";
}

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

export function setFormData({
  selector = { title, author, pages, status },
  data = { title, author, pages, status },
}) {
  document.querySelector(selector.title).value = data.title;
  document.querySelector(selector.author).value = data.author;
  document.querySelector(selector.pages).value = data.pages;
  document.querySelector(selector.status).value = data.status;
}

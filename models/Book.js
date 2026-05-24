export default function createBook({ title, author, pages, status }) {
    return { id: crypto.randomUUID(), title, author, pages, status };
}

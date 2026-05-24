export default function createEmptyMessage() {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "book-card-empty";
    emptyMessage.textContent = `There's no book being added.`;

    return emptyMessage;
}

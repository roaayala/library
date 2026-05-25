export const toggleDialog = (selector, action) => {
    const el = document.querySelector(selector);

    action === "open" ? el.showModal() : el.close();
};

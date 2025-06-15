import { handleSubmit } from "./formHandler";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("url-form");
    form.addEventListener("submit", handleSubmit);
});

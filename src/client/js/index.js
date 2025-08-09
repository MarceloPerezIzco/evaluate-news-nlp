import { handleSubmit } from "./formHandler.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("url-form");
    form.addEventListener("submit", handleSubmit);
});

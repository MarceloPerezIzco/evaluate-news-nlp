import { handleSubmit } from "./formHandler.js";

export function attachFormHandler() {
    const form = document.getElementById("url-form");
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
}

document.addEventListener("DOMContentLoaded", attachFormHandler);

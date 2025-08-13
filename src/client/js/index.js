import { handleSubmit } from "./formHandler.js";

export function attachFormHandler() {
    const form = document.getElementById("url-form");
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }
}

document.addEventListener("DOMContentLoaded", attachFormHandler);

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => console.log("SW registered"))
            .catch((err) => console.error("SW registration failed:", err));
    });
}

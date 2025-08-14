async function handleSubmit(event) {
    event.preventDefault();

    const articleUrl = document.getElementById("article-url").value.trim();
    const sentimentEl = document.getElementById("sentiment");
    const contentTypeEl = document.getElementById("contentType");
    const previewEl = document.getElementById("preview");
    const errorEl = document.getElementById("error");

    errorEl.textContent = "";
    errorEl.style.display = "none";

    if (!articleUrl || !isValidUrl(articleUrl)) {
        errorEl.textContent = "Please insert a valid URL";
        errorEl.style.display = "block";
        return;
    }

    try {
        const response = await fetch("/analyse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify({ url: articleUrl }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();

        sentimentEl.textContent = data.sentiment ?? "Unknown";
        contentTypeEl.textContent = data.subjectivity ?? "Unknown";
        previewEl.textContent = data.text ?? "";
    } catch (error) {
        errorEl.textContent = "Error obtaining data from the API";
        errorEl.style.display = "block";
        console.log("❌ Error:", error);
    }
}

function isValidUrl(str) {
    try {
        const u = new URL(str);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
}

export { handleSubmit };

async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const articleUrl = document.getElementById("article-url").value;

    // Check if input is empty
    if (!articleUrl.trim()) {
        console.log("⚠️ The input is empty");
        return;
    }

    console.log("✅ Form submitted from formHandler.js");

    try {
        const response = await fetch("http://localhost:3000/analyse", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: articleUrl }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("🧠 Response from server:", data);
    } catch (error) {
        console.log("❌ Error during fetch:", error);
    }
}

export { handleSubmit };

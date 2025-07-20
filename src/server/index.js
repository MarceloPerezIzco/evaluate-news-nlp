const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// 1. Middleware for parsing JSON in POST requests
app.use(express.json());

// 2. Serving static files from dist
app.use(express.static(path.join(__dirname, "../../dist")));

// 3. Routes
app.post("/analyse", async (req, res) => {
    const textToSend = "Hello World";
    const apiUrl = "https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer";

    try {
        const apiResponse = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ text: textToSend }),
        });
        const data = await apiResponse.json();
        // Send result to front-end
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error communication with external API" });
    }
});

// 4. Raise the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

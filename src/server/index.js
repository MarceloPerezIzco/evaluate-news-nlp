import express from "express";
import path from "path";
import * as cheerio from "cheerio";

const app = express();
const PORT = 3000;

// 1. Middleware for parsing JSON in POST requests
app.use(express.json());

// 2. Serving static files from dist
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "../../dist")));

// 3. Routes
app.post("/analyse", async (req, res) => {
    const apiUrl = "https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer";
    const { url } = req.body;

    if (!url || typeof url !== "string" || !url.trim()) {
        return res.status(400).json({ error: "Missing or invalid URL" });
    }

    try {
        // 1. Obtain HTML
        const htmlResponse = await fetch(url);
        if (!htmlResponse.ok) {
            throw new Error(`Failed to fetch the page: ${htmlResponse.status}`);
        }
        const html = await htmlResponse.text();

        // 2. Extract text
        const $ = cheerio.load(html);
        let text = $("body").text();
        text = text.replace(/\s+/g, " ").trim().slice(0, 200);

        if (!text) {
            return res.status(422).json({ error: "No readable text found at this URL." });
        }

        // 3. Send text to the API
        const apiResponse = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ text }),
        });
        const data = await apiResponse.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error communication with external API" });
    }
});

// 4. Raise the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

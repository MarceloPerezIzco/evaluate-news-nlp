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
        console.log("➡️  Fetching page:", url);

        const commonHeaders = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Upgrade-Insecure-Requests": "1",
            Connection: "keep-alive",
        };

        let html;
        let htmlResponse = await fetch(url, { headers: commonHeaders, redirect: "follow" });
        console.log("⬅️  Page status:", htmlResponse.status);

        if (!htmlResponse.ok) {
            // Fallback
            const proxyUrl = "https://r.jina.ai/http://" + url.replace(/^https?:\/\//, "");
            console.log("🔁 Falling back to:", proxyUrl);

            htmlResponse = await fetch(proxyUrl, { headers: { "User-Agent": commonHeaders["User-Agent"] } });
            console.log("⬅️  Fallback status:", htmlResponse.status);

            if (!htmlResponse.ok) {
                return res.status(htmlResponse.status).json({
                    error: `Failed to fetch the page (status ${htmlResponse.status})`,
                });
            }
        }

        html = await htmlResponse.text();

        const $ = cheerio.load(html);
        let text = $("article").text().trim() || $("main").text().trim() || $('[role="main"]').text().trim() || $("body").text().trim();

        text = text.replace(/\s+/g, " ").slice(0, 200);

        if (!text) {
            return res.status(422).json({ error: "No readable text found at this URL." });
        }

        const apiUrl = "https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer";
        const apiResponse = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ text }),
        });

        if (!apiResponse.ok) {
            return res.status(502).json({ error: `NLP API failed (status ${apiResponse.status})` });
        }

        const data = await apiResponse.json();
        res.json({ ...data, text });
    } catch (error) {
        res.status(500).json({ error: "Error communication with external API" });
    }
});

// 4. Raise the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

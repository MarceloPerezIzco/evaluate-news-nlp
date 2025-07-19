const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// 1. Middleware for parsing JSON in POST requests
app.use(express.json());

// 2. Serving static files from dist
app.use(express.static(path.join(__dirname, "../../dist")));

// 3. Routes
app.post("/analyse", (req, res) => {
    console.log("🔵 Body recibido:", req.body);
    res.json({
        message: "Petición recibida correctamente!",
        url: req.body.url,
    });
});

// 4. Raise the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

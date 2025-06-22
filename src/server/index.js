const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware for parsing JSON in POST requests
app.use(express.json());

// Initialise the main project folder
app.use(express.static(path.join(__dirname, "../../dist")));

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

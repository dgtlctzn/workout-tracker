const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/api/config", (req, res) => {
    res.json({
        success: true
    })
})

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})
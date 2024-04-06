const express = require('express');
const app = express();
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log(`Listening for requests on port ${process.env.PORT}`)
})

app.get("/", (req, res) => {
    res.json({message: "Handled the request"})
})
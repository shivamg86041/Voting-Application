const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const db = require("./db");
require('dotenv').config();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.get('/', (req, res) =>{
    res.send("This is the backend of Voting application");
})
app.listen(PORT, () =>{
    console.log("Listening on port 3000");
})
const express = require('express');
const cors = require("cors");

const app = express();

app.use(express.json());

app.get('/', (req, res) => { 
    res.send('OK');
})


app.listen(3001);
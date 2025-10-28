const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');


app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'glicin'
});


app.use(express.static(path.join(__dirname, '../frontend')));


app.post('/kerdoiv', (req, res) => {
    console.log('Received quiz results:', req.body);
    res.json({ status: 'ok' });

});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'));
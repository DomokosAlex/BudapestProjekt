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

    
const query = 'INSERT INTO kerdoiv (halott, haigenhonnan, nemzetiseg, orszag, nem, lakhely, kor, egeszsegallapot, vegzettseg) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?)';
const values = [req.body[1], req.body[2], req.body[3],req.body[4], req.body[5], req.body[6],req.body[7], req.body[8], req.body[9]];

connection.query(query, values, (err) => {
    if (err) return res.status(500).send('Hiba történt: ' + err);
    res.json({ status: 'ok' });
});



});



/*
app.post('/ajanlas', (req, res) => {

    
const query = 'INSERT INTO teszt (eg, eag, gh) VALUES (?, ?, ?)';
const values = [req.body[1], req.body[2], req.body[3]];

connection.query(query, values, (err) => {
    if (err) return res.status(500).send('Hiba történt: ' + err);
    res.json({ status: 'ok' });
});



});

*/


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'));
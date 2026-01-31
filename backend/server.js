const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');

const { ValidalasKerdoiv, ValidalasAjanlas } = require('./Validalas');

const kerdesek_json = require("./kerdoiv_kerdesek.json");
const ajan_kerdesek = require("./ajanlas_kerdesek.json");


app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'glicin'
});


app.use(express.static(path.join(__dirname, '../frontend')));


app.post('/kerdoiv', (req, res) => {

    const query = 'INSERT INTO kerdoiv (hallott, haigenhonnan, nemzetiseg, orszag, nem, lakhely, kor, egeszsegallapot, vegzettseg) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?)';

    if (ValidalasKerdoiv(req.body.valaszok)) {

        const values = [];

        for (let i = 0; i < req.body.valaszok.length; i++) {
            values.push(kerdesek_json[i].valaszlehetosegek[req.body.valaszok[i].valasztott].valasz);

        }


        connection.query(query, values, (err) => {
            if (err) return res.status(500).send('Hiba történt: ' + err);
            res.json({ status: 'ok' });
        });

    } else {
        //HA A VALIDALAS AZT MONDJA HIBA VAN

    }





});

app.get('/ajanlas/:kod', (req, res) => {
    const kod = req.params.kod;
    connection.query('SELECT * FROM ajanlas WHERE kod = ? LIMIT 1', [kod], (err, results) => {
        if (err) {
            console.error('DB hiba:', err);
            return res.status(500).json({ error: 'db' });
        }
        res.json(results[0] || null);
    });
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});


app.get('/statisztikak', (req, res) => {
    connection.query('SELECT * FROM kerdoiv', (err, results) => {
        if (err) return res.send('Hiba történt: ' + err);
        res.json(results);
        
    });
});


app.get('/statisztika/kerdesek', (req, res) => {
    res.json(kerdesek_json.map(q => ({
        valaszok: q.valaszlehetosegek.map(v => v.valasz)
    })));
});

const ajanl_kerd = require('./ajanlas_kerdesek');

app.get('/api/ajanlas_kerd', (req, res) => {
    // Csak a kérdést és a válaszlehetőségek szövegét küldjük el
    const biztonsagosAdat = ajanl_kerd.map(q => ({
        id: q.id,
        szoveg: q.szoveg,
        valaszok: q.valaszok.map(v => v.ker), // Csak a szöveg megy át!
        megcsinalta: q.megcsinalta,
        valasztott: q.valasztott
    }));
    res.json(biztonsagosAdat);
});




app.post('/api/kiertekeles', async (req, res) => {
    try {
        const { meta, valaszok } = req.body;
        const add = require('./ajanlas_eredmenysamitas');
        const { vegeredmeny } = await add.Befejezes(meta, valaszok, connection)

        const query = 'INSERT INTO ajanlas (kod,jelzo, leiras,tanacs,status,bmi) VALUES (?,?,?,?,?,?)';
        const values = [vegeredmeny.kod, vegeredmeny.jelzo, vegeredmeny.leiras, vegeredmeny.tanacs, vegeredmeny.status, vegeredmeny.bmi];

        if (ValidalasAjanlas(valaszok)) {
            connection.query(query, values, (err) => {
            if (err) {
                console.error("DB hiba:", err);
                return res.status(500).json({ error: 'Hiba történt az adatbázis művelet közben.' });
            }
            res.json({ status: 'ok', adatok: vegeredmeny });
        });
        } else {
            console.log(false)
        }
        
    } catch (error) {
        console.error("Hiba:", error);
        res.status(500).json({ error: "Hiba a kiértékelés során." });
    }

});




app.get('/api/kerdoiv_kerd', (req, res) => {
    // Csak a kérdést és a válaszlehetőségek szövegét küldjük el
    const biztonsagosAdat = kerdesek_json.map(q => ({
        id: q.id,
        szoveg: q.kerdes,
        valaszok: q.valaszlehetosegek.map(v => v.valasz), // Csak a szöveg megy át!
        megcsinalta: q.megcsinalta,
        valasztott: q.valasztott
    }));
    res.json(biztonsagosAdat);
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'));

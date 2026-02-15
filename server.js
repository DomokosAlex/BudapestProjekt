const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');
const rateLimit = require('express-rate-limit');
require("dotenv").config();


const { ValidalasKerdoiv, ValidalasAjanlas } = require('./Validalas');

const kerdesek_json = require("./kerdoiv_kerdesek.json");
const ajan_kerdesek = require("./ajanlas_kerdesek.json");


app.use(bodyParser.json({ limit: '25kb' }));


/*
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
*/

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if (err) console.error('POOL ERROR:', err);
    else {
        console.log('Database Pool Connected');
        conn.release();
    }
});


app.use(express.static(path.join(__dirname, 'public')));

app.post('/kerdoiv', (req, res) => {

    const query = 'INSERT INTO kerdoiv (hallott, haigenhonnan, nemzetiseg, orszag, nem, lakhely, kor, egeszsegallapot, vegzettseg) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?)';

    if (ValidalasKerdoiv(req.body.valaszok)) {
        console.log(req.body.valaszok);
        const values = [];

        for (let i = 0; i < req.body.valaszok.length; i++) {
            values.push(kerdesek_json[i].valaszlehetosegek[req.body.valaszok[i].valasztott].valasz);

        }


        pool.query(query, values, (err) => {
            if (err) { console.error(err); return res.status(500).json({ error: "Szerver hiba" }); }
            res.json({ status: 'ok' });
        });

    } else {
        //HA A VALIDALAS AZT MONDJA HIBA VAN
        return res.status(400).json({ error: "Érvénytelen adatok" });

    }





});




app.get("/sitemap.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.removeHeader("Retry-After"); // fontos
  res.sendFile(path.join(__dirname, "sitemap.xml"));
});






app.get('/ajanlas/:kod', (req, res) => {
    const kod = req.params.kod;
    pool.query('SELECT * FROM ajanlas WHERE kod = ? LIMIT 1', [kod], (err, results) => {
        if (err) {
            console.error('DB hiba:', err);
            return res.status(500).json({ error: 'Szerver hiba' });
        }
        res.json(results[0] || null);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/api/statisztika', (req, res) => {
    pool.query('SELECT * FROM kerdoiv', (err, results) => {
        if (err) { console.error(err); return res.status(500).json({ error: "Szerver hiba" }); }
        res.json(results);

    });
});


app.get('/api/statisztika/kerdesek', (req, res) => {
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
        const { vegeredmeny } = await add.Befejezes(meta, valaszok, pool)

        const query = 'INSERT INTO ajanlas (kod,jelzo, leiras,tanacs,status,bmi) VALUES (?,?,?,?,?,?)';
        const values = [vegeredmeny.kod, vegeredmeny.jelzo, vegeredmeny.leiras, vegeredmeny.tanacs, vegeredmeny.status, vegeredmeny.bmi];

        if (ValidalasAjanlas(valaszok)) {
            pool.query(query, values, (err) => {
                if (err) {
                    console.error("DB hiba:", err);
                    return res.status(500).json({ error: "Szerver oldali hiba történt." });
                }
                res.json({ status: 'ok', adatok: vegeredmeny });
            });
        } else {
            return res.status(400).json({ error: "Érvénytelen adatok" });
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


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Listening on port:', PORT));

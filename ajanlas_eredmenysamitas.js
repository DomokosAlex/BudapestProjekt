
const eredetiAdatok = require('./ajanlas_kerdesek.json');
const vegeredmeny = {};


function BMI_calculator(meta) {
    if (!meta.testsuly || !meta.magassag) return null;
    const m = meta.magassag / 100;
    const bmi = +(meta.testsuly / (m * m)).toFixed(1);
    return bmi;
}

function eredmenysz(valasztasok, bmi) {
    let user_ossz = 0;

    valasztasok.forEach(v => {
        
        const kerdes = eredetiAdatok.find(q => q.id === v.id);
        if (kerdes && v.valasztott !== null && v.valasztott !== undefined && kerdes.valaszok[v.valasztott]) {
            user_ossz += kerdes.valaszok[v.valasztott].ert * kerdes.weight;
        }


    });


    if (bmi) {
        let szorzo = 1.0;

        if (bmi < 18.5) szorzo = 0.9;      // 10% büntetés
        else if (bmi > 30) szorzo = 0.8;   // 20% büntetés

        if (szorzo < 1.0) {
            if (user_ossz >= 0) {
                user_ossz *= szorzo;
            } else {
                user_ossz *= (2 - szorzo);
            }
        }
    }

    user_ossz = Math.round(user_ossz * 10) / 10;

    return { user_ossz };
}

async function genCode(connection) {
    let kod;
    let letezik = true;

    while (letezik) {
        kod = Math.floor(10000000 + Math.random() * 90000000).toString();

        // Ellenőrzés az adatbázisban
        const [rows] = await connection.promise().query(
            'SELECT kod FROM ajanlas WHERE kod = ?',
            [kod]
        );

        if (rows.length === 0) letezik = false;
    }
    return kod;
}

async function Befejezes(meta, valasztasok, connection) {

    const bmi = BMI_calculator(meta);
    const { user_ossz } = eredmenysz(valasztasok, bmi);

    let status = "";
    let leiras = "";
    let jelzo_szin="";
    let tanacs = [];

    // JAVÍTÁS: A 8-as kérdés válaszát a felhasználó válaszaiból keressük ki!
    

    
   
        /*
        jelzo_szin = "alert-danger";
        status = "NEM JAVASOLT A PÓTLÁS (Egyéni Érzékenység)";
        leiras = "A szervezetedben a glutamát-GABA egyensúly eltolódott (NMDA receptor túlérzékenység). A glicin izgató hatású lehet nálad.";
        tanacs.push("Az általad tapasztalt rosszullét (szorongás/pörgés) miatt a tiszta glicin szedése TILOS.");
        tanacs.push("Fókuszálj a Magnézium és B6-vitamin bevitelre.");
        tanacs.push("Kizárólag természetes forrásból (hosszú főzésű húsleves) próbáld bevinni, óvatosan.");*/
  
        if (user_ossz <= -40) {
            jelzo_szin = "alert-danger";
            status = "Kritikus Glicin-hiány";
            leiras = "A szervezet a kollagén szöveteit bontja le a túléléshez (méregtelenítés/immunvédelem).";
            tanacs.push("Sürgős glicin pótlás javasolt (5-10g), és a színhús bevitel radikális csökkentése.");
            tanacs.push("Növeld a kollagénben gazdag ételek (csontlé, bőr, zselatin) fogyasztását.");

        } else if (user_ossz >= -39 && user_ossz <= -11) {
            jelzo_szin = "alert-warning";
            status = "Funkcionális Hiány";
            leiras = "Nincs elég tartalék a regenerációhoz. Gyorsult öregedés, rossz alvás és gyenge ízületek jellemzik.";
            tanacs.push("Próbálj 5–10 g napi glicint vagy kollagénport 1–2 hétig, és figyeld a változásokat.");
            tanacs.push("Támogasd a rendszeredet több csontlevessel.");

        } else if (user_ossz >= -10 && user_ossz <= 20) {
            jelzo_szin = "alert-info";
            status = "Egyensúlyi (Fenntartó)";
            leiras = "A bevitel fedezi az alapvető szükségleteket, de stressz esetén hamar hiányállapot lép fel.";
            tanacs.push("3–5 g/nap valószínűleg elegendő; tartsd a változatos fehérjebevitelt.");
            tanacs.push("Figyelj az alvásminőségre stresszes időszakokban.");

        } else if (user_ossz >= 21 && user_ossz <= 50) {
            jelzo_szin = "alert-success";
            status = "Optimális Szint";
            leiras = "Bőséges glicin áll rendelkezésre a kollagénépítéshez és az idegrendszer nyugalmához.";
            tanacs.push("Folytasd a jelenlegi étrendet, a szervezeted regenerációs képessége kiváló.");

        } else if (user_ossz >= 51) {
            jelzo_szin = "alert-success";
            status = "Regeneratív Telítettség";
            leiras = "Maximális támogatás a májnak és az ízületeknek. Magas szintű antioxidáns (Glutation) védelem.";
            tanacs.push("Optimális állapot. Ha kiegészítőt szedsz, tarthatsz szünetet vagy csökkentheted a dózist.");
        }

        if (bmi !== null) {
            if (bmi < 18.5) tanacs.push("Alacsony testsúly: növeld a kalória- és fehérjebevitelt a kollagénépítéshez.");
            else if (bmi > 30) tanacs.push("Magas BMI: a belső gyulladások extra glicint emésztenek fel, javasolt a tudatos pótlás.");
        }

        if (meta.nem === "nő") {
            tanacs.push("Nők esetén fontos a bőr és csontok kollagénellátása; figyeld a havi ciklus és energiaszint változásait.");
        }
    

    const eredmeny_kod = await genCode(connection);

    const vegeredmeny = {
        kod: eredmeny_kod,
        jelzo:jelzo_szin,
        leiras: leiras,
        tanacs: tanacs.join(";"),
        status: status,
        bmi: bmi 
    };



    return { vegeredmeny }
}




module.exports = { Befejezes };
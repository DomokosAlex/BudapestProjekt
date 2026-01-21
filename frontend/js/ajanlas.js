class Kalkulator {
    constructor(sorszam, szoveg, valaszok, weight = 1) {
        this.sorszam = sorszam;
        this.szoveg = szoveg;
        this.valaszok = valaszok;
        this.weight = weight;
        this.megcsinalta = false;
        this.valasztott = null;
    }
}
const Kalkulator_adat = [


    new Kalkulator(1, "Mennyi idős vagy?", [
        { ker: "20 év alatt", ert: 3 },       
        { ker: "20–35 év között", ert: 1 },  
        { ker: "35–50 év között", ert: -2 },  
        { ker: "50 év felett", ert: -4 }      
    ], 1.5),

    new Kalkulator(2, "Milyen húsokat fogyasztasz leggyakrabban?", [
        { ker: "Főleg színhúst (csirkemell, comb, steak)", ert: -3 }, 
        { ker: "Vegyesen (hús és néha levesek)", ert: 0 },
        { ker: "Sok porcos/bőrös részt (kocsonya, körömpörkölt, csontleves)", ert: 5 }, 
        { ker: "Nem eszem húst / Vegán vagyok", ert: -1 } 
    ], 1.8),

    new Kalkulator(3, "Mennyi feldolgozott élelmiszert eszel (konzerv, bolti felvágott, készétel)?", [
        { ker: "Rendszeresen, napi szinten", ert: -5 }, 
        { ker: "Gyakran (heti többször)", ert: -3 },
        { ker: "Néha, de figyelek rá", ert: 0 },
        { ker: "Soha / Csak friss alapanyagot", ert: 2 }
    ], 1.6),

    new Kalkulator(4, "Hogyan gyógyulnak a sebeid, milyen a bőröd állapota?", [
        { ker: "Lassan gyógyul, hegesedik / Striák / Korai ráncok", ert: -4 },
        { ker: "Átlagos, normális", ert: 0 },
        { ker: "Gyorsan gyógyul, rugalmas a bőröm", ert: 3 }
    ], 1.4),

    new Kalkulator(5, "Milyen az alvásminőséged és a stressz-szinted?", [
        { ker: "Nehezen alszom el / Éjjel felébredek", ert: -5 }, 
        { ker: "Fáradtan ébredek, de végigalszom az éjjelt", ert: -2 },
        { ker: "Jól alszom, kipihent vagyok", ert: 3 }
    ], 1.4),

    new Kalkulator(6, "Tapasztalsz ízületi kattogást vagy fájdalmat?", [
        { ker: "Gyakran / Krónikus fájdalom", ert: -3 },
        { ker: "Néha, terhelésre", ert: -1 },
        { ker: "Nem, minden rendben", ert: 2 }
    ], 1.2),

    new Kalkulator(7, "Szedsz-e jelenleg glicint vagy kollagént?", [
        { ker: "Nem szedek", ert: 0 },
        { ker: "Igen, kis mennyiséget / rendszertelenül", ert: 1 },
        { ker: "Igen, nagy dózist (5g+ glicin vagy 10g+ kollagén)", ert: 5 } 
    ], 1.0),

    
    new Kalkulator(8, "Ha szedtél már glicint, tapasztaltál rosszullétet (szorongás, pörgés, hányinger)?", [
        { ker: "Még nem szedtem / Nem tapasztaltam", ert: 0 },
        { ker: "Igen, rosszul voltam tőle", ert: -20 }, // AZONNALI TILTÁS! 
        { ker: "Csak enyhe puffadást", ert: 0 }
    ], 3.0)
];

let currentIndex = -1;
let userMeta = { nem: "", testsuly: null, magassag: null };
const vegeredmeny = {};

window.addEventListener('load', () => {
    Elso_Oldal();
});

function kerdes_felteves(i) {
    const area = document.getElementById("questionArea");

    // védelem hibás indexek ellen
    if (i === -1 || i === null || i === undefined) {
        if (area) area.innerHTML = "";
        return;
    }
    if (i < 0 || i >= Kalkulator_adat.length) {
        if (area) area.innerHTML = `<p>Hiba: érvénytelen kérdésszám.</p>`;
        return;
    }

    const q = Kalkulator_adat[i];
    const selected = q.valasztott;

    let html = `<h3 class="mb-3">${q.szoveg}</h3>`;
    html += `<form id="Form">`;
    q.valaszok.forEach((v, idx) => {
        const checked = (selected === idx) ? "checked" : "";
        html += `<label class="d-block h4"><input type="radio" name="valasz" value="${idx}" class="big-radio" ${checked}> ${v.ker}</label>`;
    });
    html += `</form>`;
    if (area) area.innerHTML = html;

    document.querySelectorAll('input[name="valasz"]').forEach(r => {
        r.addEventListener('change', (ev) => {
            q.valasztott = Number(ev.target.value);
            q.megcsinalta = true;
            navigacios_gomb();
        });
    });
}

function Elso_Oldal() {
    const root = document.getElementById("Kerdesek");

    root.innerHTML = `
        <div class="row pt-5">
            <div class="col-md-4">
                <div class="mb-4">
                    <label class="form-label h4">Nem</label>
                    <select id="nem" class="form-select" >
                        <option value="">(válassz)</option>
                        <option value="férfi">Férfi</option>
                        <option value="nő">Nő</option>
                        <option value="egyéb">Egyéb</option>
                    </select>
                </div>
                <div class="mb-4 ">
                    <label class="form-label  h4">Testsúly (kg)</label>
                    <input id="testsuly" type="number" min="20" max="400" class="form-control" >
                </div>
                <div class="mb-4  h4">
                    <label class="form-label">Magasság (cm)</label>
                    <input id="magassag" type="number" min="80" max="260" class="form-control" >
                </div>
            </div>
            <div class="col-md-8"></div>
        </div>

        <div class="mt-3 p-3">
            <div id="helyzet" class="mt-2 text-center"></div>
        </div>

        <br>
        <div class="text-end">
            <button class="btn btn-secondary btn-lg" onclick="Elozo()">Előző</button>
            <button class="btn btn-success btn-lg" id="kov" onclick="Kovetkezo()">Következő</button>
        </div>`;

    const nemEl = document.getElementById("nem");
    const tsEl = document.getElementById("testsuly");
    const mgEl = document.getElementById("magassag");

    if (userMeta.nem) nemEl.value = userMeta.nem;
    if (userMeta.testsuly !== null) tsEl.value = userMeta.testsuly;
    if (userMeta.magassag !== null) mgEl.value = userMeta.magassag;

    // event listenerek, hogy frissítsék a userMeta-t
    nemEl.addEventListener("change", e => { userMeta.nem = e.target.value; });
    tsEl.addEventListener("input", e => {
        userMeta.testsuly = e.target.value ? Number(e.target.value) : null;
    });
    mgEl.addEventListener("input", e => {
        userMeta.magassag = e.target.value ? Number(e.target.value) : null;
    });
    navigacios_gomb();


}

function renderAll() {
    const root = document.getElementById("Kerdesek");
    root.innerHTML = `
    <div class="row mb-2">
        <div class="col-md-6">
            <div id="questionArea"></div>
        </div>
    </div> 
    <div class="mt-3 p-3">
        <div id="helyzet" class="mt-2 text-center"></div>
    </div>

    <br>
    <div class="text-end">
        <button class="btn btn-secondary btn-lg" onclick="Elozo()">Előző</button>
        <button class="btn btn-success btn-lg" id="kov" onclick="Kovetkezo()">Következő</button>
    </div>`;
    navigacios_gomb();
}

function navigacios_gomb() {
    const helyzet = document.getElementById("helyzet");
    if (!helyzet) return;

    // építsük fel egyszerre

    const kimutatas = (currentIndex == -1) ? "btn-success" : "btn-secondary";
    helyzet.innerHTML = `<button class="btn m-1 p-2 col-1 ${kimutatas}" onclick="ugras(-1)">0</button>`;
    Kalkulator_adat.forEach(k => {
        const idx = k.sorszam - 1;
        const cls = (idx === currentIndex) ? "btn-success" : (k.megcsinalta || k.valasztott !== null) ? "btn-secondary" : "btn-warning";
        helyzet.innerHTML += `<button class="btn m-1 p-2 col-1 ${cls}" onclick="ugras(${idx})">${k.sorszam}</button>`;
    });


}

function Kovetkezo() {
    if (currentIndex === -1) {
        currentIndex = 0;
        renderAll();
        kerdes_felteves(currentIndex);
        navigacios_gomb();
        return;
    }

    const selected = document.querySelector('input[name="valasz"]:checked');
    if (!selected) {
        alert("Válassz egy választ, vagy használd a kérdésszám gombokat.");
        return;
    }

    Kalkulator_adat[currentIndex].valasztott = selected.value;
    Kalkulator_adat[currentIndex].megcsinalta = true;

    if (currentIndex === Kalkulator_adat.length - 1) {
        if (Kalkulator_adat.every(q => q.megcsinalta || q.valasztott !== null)) {
            alert("Lejebb görgetve megtekintheti az eredményét")
            Befejezes();
            return;
        } else {
            alert("Töltsd ki az összes kérdést a befejezéshez.");
            return;
        }
    }
    currentIndex++;
    kerdes_felteves(currentIndex);
    navigacios_gomb();
}

function Elozo() {
    if (currentIndex === -1) {
        alert("Nem lehet visszább menni");
        return;
    }
    if (currentIndex === 0) {
        Elso_Oldal();
        currentIndex = -1;
        return;
    }
    currentIndex--;
    kerdes_felteves(currentIndex);
    navigacios_gomb();
}

function ugras(szam) {

    if (szam == -1) {
        currentIndex = -1;
        Elso_Oldal();

        return;
    }
    currentIndex = szam;
    renderAll();
    kerdes_felteves(currentIndex);
    navigacios_gomb();
}

// EREDMÉNY SZÁMITÁS
function BMI_calculator() {
    if (!userMeta.testsuly || !userMeta.magassag) return null;
    const m = userMeta.magassag / 100;
    const bmi = +(userMeta.testsuly / (m * m)).toFixed(1);
    return bmi;
}

function eredmenysz() {
    let user_ossz = 0;
    let max = 0;
    Kalkulator_adat.forEach(q => {
        const maxOpt = Math.max(...q.valaszok.map(v => v.ert));
        max += maxOpt * q.weight;
        if (q.valasztott !== null && q.valasztott !== undefined) {
            user_ossz += q.valaszok[q.valasztott].ert * q.weight;
        }
    });

    let bmi = BMI_calculator();
    if (bmi) {
        if (bmi < 18.5) user_ossz *= 0.9;
        else if (bmi > 30) user_ossz *= 0.8;
        else user_ossz *= 1.0;
    }


    return { user_ossz };
}




/* ---------- EREDMÉNYOLDAL ---------- */
function Befejezes() {

    const { user_ossz } = eredmenysz();
    const bmi = BMI_calculator();



    let status, leiras = "", tanacs = [];

    // --- PONT RENDSZER ALAPÚ KIÉRTÉKELÉS ---

    if (user_ossz <= -40) {
        status = "Kritikus Glicin-hiány";
        leiras = "A szervezet a kollagén szöveteit bontja le a túléléshez (méregtelenítés/immunvédelem).";
        tanacs.push("Sürgős glicin pótlás javasolt (5-10g), és a színhús bevitel radikális csökkentése.");
        tanacs.push("Növeld a kollagénben gazdag ételek (csontlé, bőr, zselatin) fogyasztását.");

    } else if (user_ossz >= -39 && user_ossz <= -11) {
        status = "Funkcionális Hiány";
        leiras = "Nincs elég tartalék a regenerációhoz. Gyorsult öregedés, rossz alvás és gyenge ízületek jellemzik.";
        tanacs.push("Próbálj 5–10 g napi glicint vagy kollagénport 1–2 hétig, és figyeld a változásokat.");
        tanacs.push("Támogasd a rendszeredet több csontlevessel.");

    } else if (user_ossz >= -10 && user_ossz <= 20) {
        status = "Egyensúlyi (Fenntartó)";
        leiras = "A bevitel fedezi az alapvető szükségleteket, de stressz esetén hamar hiányállapot lép fel.";
        tanacs.push("3–5 g/nap valószínűleg elegendő; tartsd a változatos fehérjebevitelt.");
        tanacs.push("Figyelj az alvásminőségre stresszes időszakokban.");

    } else if (user_ossz >= 21 && user_ossz <= 50) {
        status = "Optimális Szint";
        leiras = "Bőséges glicin áll rendelkezésre a kollagénépítéshez és az idegrendszer nyugalmához.";
        tanacs.push("Folytasd a jelenlegi étrendet, a szervezeted regenerációs képessége kiváló.");

    } else if (user_ossz >= 51) {
        status = "Regeneratív Telítettség";
        leiras = "Maximális támogatás a májnak és az ízületeknek. Magas szintű antioxidáns (Glutation) védelem.";
        tanacs.push("Optimális állapot. Ha kiegészítőt szedsz, tarthatsz szünetet vagy csökkentheted a dózist.");
    }

    if (bmi !== null) {
        if (bmi < 18.5) tanacs.push("Alacsony testsúly: növeld a kalória- és fehérjebevitelt a kollagénépítéshez.");
        else if (bmi > 30) tanacs.push("Magas BMI: a belső gyulladások extra glicint emésztenek fel, javasolt a tudatos pótlás.");
    }

    if (userMeta.nem === "nő") {
        tanacs.push("Nők esetén fontos a bőr és csontok kollagénellátása; figyeld a havi ciklus és energiaszint változásait.");
    }


    const eredmeny_kod = genCode();
    vegeredmeny["kod"] = eredmeny_kod;
    vegeredmeny["szazalek"] = user_ossz;
    vegeredmeny["tanacs"] = tanacs.toString();
    vegeredmeny["status"] = status.toString();
    vegeredmeny["bmi"] = bmi;

    sendResultsToBackend();



    const out = document.getElementById("resultArea");
    out.innerHTML = `
    <div class="card p-4 shadow-sm">
      <h4 class="mb-3">Glicin-státusz Vizsgálat</h4>
      <p class="mb-1"><strong>Azonosító kód:</strong> ${eredmeny_kod}</p>
      <hr>
      <div class="alert ${user_ossz < -10 ? 'alert-danger' : 'alert-success'}">
        <h5 class="alert-heading">${status}</h5>
        <p class="mb-0 small">${leiras}</p>
      </div>
      ${bmi !== null ? `<p class="mb-1"><strong>BMI:</strong> ${bmi}</p>` : `<p class="mb-1 text-muted small">BMI nincs megadva.</p>`}
      <hr>
      <h6>Személyre szabott ajánlások:</h6>
      <ul class="text-left">
        ${tanacs.map(a => `<li class="mb-1">${a}</li>`).join("")}
      </ul>
    </div>
  `;
}

function eredmeny_kimutatas() {

}
function genCode() {
    const abc = "abcdefghijklmnopqrstuvwxyz";
    const betu = abc[Math.floor(Math.random() * abc.length)];
    const szam = Math.floor(Math.random() * 1000);
    return betu + szam;
}





function sendResultsToBackend() {
    fetch('http://localhost:3000/ajanlas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vegeredmeny)
    })
        .then(res => res.json())
        .then(data => console.log('Backend response:', data))
        .catch(err => console.error('Error sending results:', err));
}


function getSzazalekFromRow(data) {
    if (!data) return null;
    return data.szazalek ?? data.eredmeny ?? data.ertek ?? null;
}


window.handleAjanlas = function (data) {
    console.log('Raw row:', data);



    let tanacsok = data.tanacs.split(".,");
    const out = document.getElementById("resultArea");
    out.innerHTML = `
 <div class="card p-4 shadow-sm">
      <h4 class="mb-3">Glicin-státusz Vizsgálat</h4>
      <p class="mb-1"><strong>Azonosító kód:</strong> ${data.kod}</p>
      <hr>
      <p class="mb-1"><strong>${data.status}</strong> </p>    
      ${data.bmi !== null ? `<p class="mb-1"><strong>BMI:</strong> ${data.bmi}</p>` : `<p class="mb-1 text-muted small">BMI nincs megadva.</p>`}
      <hr>
      <h6>Személyre szabott ajánlások:</h6>
      <ul>
        ${tanacsok.map(a => `<li>${a}</li>`).join("")}
      </ul>
    </div>
  `;
};

document.getElementById('lekeres').addEventListener('click', () => {
    const kod = document.getElementById('kod').value;

    fetch('/ajanlas/' + kod)
        .then(r => r.json())
        .then(data => {


            if (window.handleAjanlas) window.handleAjanlas(data);
        })
        .catch(err => { console.log('Hiba: ' + err); });
});
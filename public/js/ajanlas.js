let kerdesek_tomb = [];
let currentIndex = -1;
let userMeta = { nem: "", testsuly: null, magassag: null };


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
    if (i < 0 || i >= kerdesek_tomb.length) {
        if (area) area.innerHTML = `<p>Hiba: érvénytelen kérdésszám.</p>`;
        return;
    }

    const q = kerdesek_tomb[i];
    const selected = q.valasztott;
    document.getElementById("cim").innerHTML = `${q.szoveg}`;

    let html = ``;

    q.valaszok.forEach((v, idx) => {
        const checked = (selected === idx) ? "checked" : "";
        html += `<label class="d-block h4">
        <input type="radio" name="valasz" value="${idx}" class="big-radio" ${checked}> ${v}
        </label>`;
    });

    if (area) area.innerHTML = html;

    document.querySelectorAll('input[name="valasz"]').forEach(r => {
        r.addEventListener('change', (ev) => {
            q.valasztott = Number(ev.target.value);
            q.megcsinalta = true;
            navigacios_gomb();
        });
    });
}

async function Elso_Oldal() {

    if (kerdesek_tomb.length === 0) {
        const response = await fetch('/api/ajanlas_kerd');
        kerdesek_tomb = await response.json();
    }

    const root = document.getElementById("Kerdesek");
    root.innerHTML = `
     <h1 id="cim" class=" mt-4 text-center p3">Glicinteszt – Vizsgáld meg a glicinmennyiséged!</h1>
    <hr>
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
                    <input id="testsuly" type="number" name="testsuly" min="20" max="400" class="form-control" placeholder="65" pattern="[0-9]{3}}" >
                </div>
                <div class="mb-4  h4">
                    <label class="form-label">Magasság (cm)</label>
                    <input id="magassag" type="number" name="magassag" min="20" max="260" class="form-control" placeholder="165" pattern="[0-9]{3}" >
                </div>
            </div>
            <div class="col-md-8"></div>
        </div>

            <div id="helyzet" class="mt-2 text-center"></div>

        <div class="text-end p-3">
            <button class="btn btn-secondary btn-lg" onclick="Elozo()">Előző</button>
            <button class="btn btn-success btn-lg" id="kov" onclick="Kovetkezo()">Következő</button>
        </div>`;

    const nemEl = document.getElementById("nem");
    const tsEl = document.getElementById("testsuly");
    const mgEl = document.getElementById("magassag");

    if (userMeta.nem) nemEl.value = userMeta.nem;
    if (userMeta.testsuly !== null && userMeta.testsuly >= 20 || userMeta.testsuly < 300) tsEl.value = userMeta.testsuly;
    if (userMeta.magassag !== null && userMeta.testsuly >= 50 || userMeta.testsuly < 240) mgEl.value = userMeta.magassag;


    // event listenerek, hogy frissítsék a userMeta-t
    nemEl.addEventListener("change", e => {
        userMeta.nem = e.target.value;
    });
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
    const szoveg = (currentIndex === kerdesek_tomb.length - 1) ? "Befejezés" : "Következő";

    root.innerHTML = `
     <h1 id="cim" class=" mt-4 text-center p3"></h1>
    <hr>
        <form id="questionArea" class="p-3 g-3"></form>
    <div id="helyzet" class="mt-2 text-center"></div>
    <div class="text-end p-3">
        <button class="btn btn-secondary btn-lg" onclick="Elozo()">Előző</button>
        <button class="btn btn-success btn-lg" id="kov" onclick="Kovetkezo()">${szoveg}</button>
    </div>`;
    navigacios_gomb();
}

function navigacios_gomb() {
    const helyzet = document.getElementById("helyzet");
    if (!helyzet) return;

    // építsük fel egyszerre

    const kimutatas = (currentIndex == -1) ? "btn-success" : "btn-secondary";
    helyzet.innerHTML = `<button class="btn m-1 p-3 col-1 ${kimutatas}" onclick="ugras(-1)">0</button>`;
    kerdesek_tomb.forEach(k => {
        const idx = k.id - 1;
        const cls = (idx === currentIndex) ? "btn-success" : (k.megcsinalta) ? "btn-secondary" : "btn-warning";
        helyzet.innerHTML += `<button class="btn m-1 p-3 col-1 ${cls}" onclick="ugras(${idx})">${k.id}</button>`;
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
    if (!selected) { return alert("Válassz egy választ, vagy használd a kérdésszám gombokat."); }

    kerdesek_tomb[currentIndex].valasztott = parseInt(selected.value);
    kerdesek_tomb[currentIndex].megcsinalta = true;

    if (currentIndex === kerdesek_tomb.length - 1) {
        if (kerdesek_tomb.every(q => q.megcsinalta || q.valasztott !== null)) {
            alert("Lejebb görgetve megtekintheti az eredményét")
            sendResultsToBackend();
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

function sendResultsToBackend() {
    const bekuldeniValo = {

        meta: {
            nem: userMeta.nem,
            testsuly: userMeta.testsuly,
            magassag: userMeta.magassag
        },

        valaszok: kerdesek_tomb.map(q => ({
            id: q.id,
            valasztott: q.valasztott
        }))
    };

    fetch('/api/kiertekeles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bekuldeniValo)
    })
        .then(response => response.json())
        .then(valasz => {
            if (valasz.status === 'ok') {
                window.handleAjanlas(valasz.adatok)
            }
        })
        .catch(error => console.error('Hiba:', error))
}


window.handleAjanlas = function (data) {



    let tanacsok = data.tanacs.split(";");
    const out = document.getElementById("resultArea");
    out.innerHTML = `
 <div class="card p-4 shadow-sm">
      <h4 class="mb-3">Glicin-státusz Vizsgálat</h4>
      <p class="mb-1"><strong>Azonosító kód:</strong> ${data.kod}</p>
      <hr>
      <div class="alert  ${data.jelzo}">
            <h5 class="alert-heading">${data.status}</h5>
            <p class="mb-0 small">${data.leiras}</p>
          </div>
      <p class="mb-1"><strong>${data.status}</strong> </p>    
      ${data.bmi !== null ? `<p class="mb-1"><strong>BMI:</strong> ${data.bmi}</p>` : `<p class="mb-1 text-muted small">BMI nincs megadva.</p>`}
      <p><strong>Leirás:</strong>${data.leiras}</p>
      <hr>
      <h6>Személyre szabott ajánlások:</h6>
      <ul class="text-left">
        ${tanacsok.map(a => `<li  class="mb-1">${a}</li>`).join("")}
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
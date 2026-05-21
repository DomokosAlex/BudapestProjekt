let kerdesek_tomb = [];
let currentIndex = 0;
let userMeta = { nem: "", testsuly: null, magassag: null };


window.addEventListener('load', () => {
    Betolt(currentIndex);
});


async function Betolt(index) {
    if (kerdesek_tomb.length === 0) {
        const response = await fetch('/api/ajanlas_kerd');
        kerdesek_tomb = await response.json();
    }

    if (index == 0) {
        Elso_Oldal();
    }
    else {
        renderAll();
        navigacios_gomb();
    }


}

function Elso_Oldal() {
    const root = document.getElementById("Kerdesek");
    root.innerHTML = `
     <h1 id="cim" class=" mt-4 text-center p3">Glicinteszt – Vizsgáld meg a glicinmennyiséged!</h1>
            <hr>

            <div class="row mb-5">
                <div class=" pt-5 col-lg-6 col-md-6">
                    <div class="col-md-9">
                        <div class="mb-4">
                            <label class="form-label h4">Nem</label>
                            <select id="nem" class="form-select">
                                <option value="">(válassz)</option>
                                <option value="férfi">Férfi</option>
                                <option value="nő">Nő</option>
                                <option value="egyéb">Egyéb</option>
                            </select>
                        </div>
                        <div class="mb-4 ">
                            <label class="form-label  h4">Testsúly (kg)</label>
                            <input id="testsuly" type="number" name="testsuly" min="20" max="400" class="form-control"
                                placeholder="65" pattern="[0-9]{3}">
                        </div>
                        <div class="mb-4  ">
                            <label class="form-label h4">Magasság (cm)</label>
                            <input id="magassag" type="number" name="magassag" min="20" max="260" class="form-control"
                                placeholder="165" pattern="[0-9]{3}">
                        </div>
                    </div>

                </div>
                <div class="mt-4 bg-light col-md-6 col-lg-6 rounded-4">
                    <div class="  text-dark  ">
                        <h1 class="modal-title fs-5 text-center m-3">Tájékoztatás az L-glicin
                            kalkulátorról
                        </h1>


                        <div class="modal-body text-justify">
                            <p>
        Mivel az L-glicin szintjének laboratóriumi körülményeken kívüli meghatározására jelenleg nem létezik
        egységes iparági szabvány, ezért egy <b>saját fejlesztésű módszertant alkalmazunk.</b>
    </p>

    <p>
        A számítás alapja egy elméleti modell: a bevitt tápanyagok és a szervezet valószínűsíthető felhasználása
        alapján <b>becsüljük meg a várható értékeket.</b> Ez a módszer nem mérés, hanem egy körülhatárolt becslés,
        amely segít eligazodni az életmódváltásban.
    </p>

    <hr>

    <p>
        <b>Fontos figyelmeztetés:</b> Ez a teszt egy belső fejlesztésű (in-house), nem diagnosztikai eljárás.
        <b>Az eredmény tájékoztató jellegű,</b> és nem helyettesíti a laboratóriumi vérvizsgálatot vagy az orvosi
        konzultációt.
    </p>

    <p>
        A teszt és a kérdőív kitöltése anonim módon történik, közvetlen személyes azonosításra alkalmas adatokat
        (például név, e-mail cím vagy telefonszám) nem gyűjtünk.
    </p>
                        </div>
                    </div>
                </div>
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
    if (userMeta.testsuly !== null && userMeta.testsuly >= 20 && userMeta.testsuly < 400) tsEl.value = userMeta.testsuly;
    if (userMeta.magassag !== null && userMeta.magassag >= 20 && userMeta.magassag < 260) mgEl.value = userMeta.magassag;
    // event listenerek, hogy frissítsék a userMeta-t
    nemEl.addEventListener("change", e => { userMeta.nem = e.target.value; });
    tsEl.addEventListener("input", e => { userMeta.testsuly = e.target.value ? Number(e.target.value) : null; });
    mgEl.addEventListener("input", e => { userMeta.magassag = e.target.value ? Number(e.target.value) : null; });

    navigacios_gomb();
}





function kerdes_felteves(i) {
    const area = document.getElementById("questionArea");

    if (i < 0 || i - 1 >= kerdesek_tomb.length) {
        area.innerHTML = `<p>Hiba: érvénytelen kérdésszám.</p>`;
        return;
    }



    const q = kerdesek_tomb[i - 1];
    const selected = q.valasztott;
    document.getElementById("cim").innerHTML = `${q.szoveg}`;


    q.valaszok.forEach((v, idx) => {
        const checked = (selected === idx) ? "checked" : "";
        area.innerHTML += `<label class="d-block h4">
        <input type="radio" name="valasz" value="${idx}" class="big-radio" ${checked}> ${v}
        </label>`;
    });



    document.querySelectorAll('input[name="valasz"]').forEach(r => {
        r.addEventListener('change', (ev) => {
            q.valasztott = Number(ev.target.value);
            q.megcsinalta = true;
            navigacios_gomb();
        });
    });
}


function renderAll() {
    const root = document.getElementById("Kerdesek");
    if (kerdesek_tomb.filter(n => n.megcsinalta == true).length >= kerdesek_tomb.length - 1) {
        szoveg = "Befejezés";
        irany = "befejezes()";
    }
    else { szoveg = "Következő"; irany = "Kovetkezo()" }
    root.innerHTML = `
     <h1 id="cim" class=" mt-4 text-center p3 fs-2"></h1>
    <hr>
        <form id="questionArea" class="p-3 g-3"></form>
    <div id="helyzet" class="mt-2 text-center"></div>
    <div class="text-end p-3">
        <button class="btn btn-secondary btn-lg" onclick="Elozo()">Előző</button>
        <button class="btn btn-success btn-lg" id="kov" onclick="${irany}">${szoveg}</button>
    </div>`;
    kerdes_felteves(currentIndex);

}

function navigacios_gomb() {
    const helyzet = document.getElementById("helyzet");


    const kimutatas = (currentIndex == 0) ? "btn-success" : (userMeta.nem.length > 0 && userMeta.magassag > 0 && userMeta.testsuly > 0) ? "btn-secondary" : "btn-warning";
    helyzet.innerHTML = `<button class="btn m-1  col-1 szam_gomb ${kimutatas}" onclick="ugras(0)">1</button>`;

    kerdesek_tomb.forEach(k => {
        const idx = k.id;
        console.log(currentIndex)
        const cls = (idx == currentIndex) ? "btn-success" : (k.megcsinalta) ? "btn-secondary" : "btn-warning";
        helyzet.innerHTML += `<button class="btn m-1  col-1 szam_gomb ${cls}" onclick="ugras(${idx})">${idx + 1}</button>`;
    });
}

function Kovetkezo() {
    if (currentIndex === 0 && userMeta.nem.length > 0 && userMeta.magassag > 0 && userMeta.testsuly > 0) {
        currentIndex++;
        Betolt(currentIndex);
        return;
    }

    const selected = document.querySelector('input[name="valasz"]:checked');
    if (!selected) { return alert("Kérlek tölts ki a mezőt"); }

    kerdesek_tomb[currentIndex - 1].valasztott = parseInt(selected.value);
    kerdesek_tomb[currentIndex - 1].megcsinalta = true;
    currentIndex++;
    Betolt(currentIndex);
}
function befejezes() {
    if (kerdesek_tomb.every(q => q.megcsinalta || q.valasztott !== null) && userMeta.nem.length > 0 && userMeta.magassag > 20 && userMeta.testsuly > 20) {

        sendResultsToBackend();
        return;
    } else {
        alert("Töltsd ki az összes kérdést a befejezéshez.");

    }
}

function Elozo() {
    if (currentIndex === 0) return alert("Ettől visszább nem lehet menni!");
    currentIndex--;
    Betolt(currentIndex);
}

function ugras(ugras) {
    currentIndex = ugras;
    Betolt(currentIndex)
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
    console.log(bekuldeniValo)
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
    location.href = "#erdmeny";

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
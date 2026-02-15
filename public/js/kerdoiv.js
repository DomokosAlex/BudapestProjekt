let index = 0;

let kerdesek_tomb = [];

window.addEventListener("load", function () {

    Betoltes(index);

})


async function Betoltes(i) {


    if (kerdesek_tomb.length === 0) {
        const response = await fetch('/api/kerdoiv_kerd');
        kerdesek_tomb = await response.json();
    }

    const oldal = document.getElementById("Kerdesek");
    const adat = kerdesek_tomb[i]
    oldal.innerHTML = `
        <h1 class="mt-4 p3 text-center">${adat.szoveg}</h1>
        <hr>
        <form id="Form" class="p-3 g-3"></form>
    `;



    const szoveg = (i === kerdesek_tomb.length - 1) ? "Befejezés" : "Következő";

    oldal.innerHTML += `
    <div class="text-center mt-2" id="helyzet"></div>
        <div class="text-end p-3">
            <button type="button" class="btn btn-secondary btn-lg" onclick="Elozo()">Előző</button>
            <button type="button" class="btn btn-success btn-lg" onclick="Kovetkezo()">${szoveg}</button>
        </div>
        
    `; Valasz_lehetosegek(adat);

    Gombok();
}
/*
function renderAll() {
    const oldal = document.getElementById("Kerdesek");
    const szoveg = (i === kerdesek_tomb.length - 1) ? "Befejezés" : "Következő";

    oldal.innerHTML = `
    <div class="text-center mt-2" id="helyzet"></div>
        <div class="text-end p-3">
            <button type="button" class="btn btn-secondary btn-lg" onclick="Elozo()">Előző</button>
            <button type="button" class="btn btn-success btn-lg" onclick="Kovetkezo()">${szoveg}</button>
        </div>
        
    `;
    Gombok();
}
*/
function Valasz_lehetosegek(adat) {
    const ker = document.getElementById("Form");
    ker.innerHTML = ``;

    const selected = adat.valasztott;
    adat.valaszok.forEach((v, idx) => {
        const checked = (selected === idx) ? "checked" : "";
        ker.innerHTML += `<label class="d-block h4">
        <input type="radio" name="valasz" value="${idx}" class="big-radio" ${checked}> ${v}
        </label>`;
    });


    document.querySelectorAll('input[name="valasz"]').forEach(r => {
        r.addEventListener('change', (ev) => {
            adat.valasztott = Number(ev.target.value);
            adat.megcsinalta = true;
            Gombok();
        });
    });



}

function ugras(ugras) {
    index = ugras;
    Betoltes(index)
    Gombok();

}

function Gombok() {

    const helyzet = document.getElementById("helyzet");
    helyzet.innerHTML = "";
    kerdesek_tomb.forEach(k => {
        const cls = (k.id - 1 === index) ? "btn-success" : (k.megcsinalta ? "btn-secondary" : "btn-warning");
        helyzet.innerHTML += `<button class="btn m-1 p-2 col-1 ${cls}" onclick="ugras(${k.id - 1})">${k.id}</button>`;
    });
}

function Kovetkezo() {
    if (!kerdesek_tomb[index]) return console.error("Index hiba");

    const selected = document.querySelector('input[name="valasz"]:checked');
    if (!selected) return alert("Jelöljön meg valamelyik választ!");

    const valIndex = parseInt(selected.value);
    const adat = kerdesek_tomb[index];

    adat.megcsinalta = true;
    adat.valasztott = valIndex;


    if (index == kerdesek_tomb.length - 1 && kerdesek_tomb.every(n => n.megcsinalta)) {

        Befejezes();
    }
    else if (index < kerdesek_tomb.length - 1) {
        index++;
        Betoltes(index);
    }
    else { alert("Kérem töltse ki a tesztet, mert igy nem lehet beküldeni!") }
}

function Elozo() {
    if (index === 0) return alert("Ettől visszább nem lehet menni!");
    index--;
    Betoltes(index);
}

function Befejezes() {
    console.log("Kitöltés eredménye:", kerdesek_tomb);

    sendResultsToBackend();

    const oldal = document.getElementById("Kerdesek");
    oldal.innerHTML = `
        <h1 class="mt-4 p3 text-center">Köszönjük, hogy kitöltötte a tesztet!</h1>
        <br>
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <h4>Ha szeretne, átmehet az ajánlás oldalra</h4>
                    <a href="../html/ajanlas.html"><button class="btn btn-primary btn-lg">Ajánlás</button></a>
                </div>
                <div class="col-6">
                    <h4>Vagy visszatérhet a főoldalra</h4>
                    <a href="../html/index.html"><button class="btn btn-primary btn-lg">Főoldal</button></a>
                </div>
            </div>
        </div>
    `;

}


function sendResultsToBackend() {

    const bekuldeniValo = {
        valaszok: kerdesek_tomb.map(q => ({
            id: q.id,
            valasztott: q.valasztott
        }))
    };
    fetch('/kerdoiv', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bekuldeniValo)
    })
        .then(res => res.json())
        .then(data => console.log('Backend response:', data))
        .catch(err => console.error('Error sending results:', err));
}

/// A /kerdoiv oldalal kell foglalkozni a serveren. oda fog menni az adat az ID - Valaszok{1,2,6,4}
///  ezeket kellesz majd validátlni
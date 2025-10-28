class Kerdoiv {
    constructor() {
        this.kerdesek = [];
        //this.Kitoltesek = [];

    }

    Felpakolas(Id, kerdes, valasz, megcsinalta) {
        const adat = { Id, kerdes, valasz, megcsinalta };
        this.kerdesek.push(adat);
    }

   /* Kitoltotes(kitoltot) {
        this.Kitoltesek.push(kitoltot)


    }*/

}

const kerd = new Kerdoiv();



kerd.Felpakolas(1, "Ismeri már az L-glicinről?", ["Igen", "Nem", "Meglehet"], false)
kerd.Felpakolas(2, "Mi a korosztáya?", ["15-25", "26-35", "36-50","50+"], false)
kerd.Felpakolas(3, "Egészségügyi állapota?", ["Egészséges","általában betegeskedem", "Tartós betegségem van"], false)
kerd.Felpakolas(4, "Milyen nemzetiségü?", ["Magyar", "Kisebbség", "Egyéb"], false)
kerd.Felpakolas(5, "Milyen településen lakik?", ["Nagyváros", "Város", "Falu"], false)
kerd.Felpakolas(6, "Honnan halott az L-glicinről?", ["Családzól", "Ismerősöktől", "Közöségi médiaban","Orvostól"], false)
kerd.Felpakolas(7, "Milyen végzettséggel rendelkezik?", ["Éretségivel", "Egyetemi", "általános"], false)
kerd.Felpakolas(8, "Szed-e bármilyen gyógyszert állandó szinten", ["Igen, szedek", "Nem, nemszedek "], false)
kerd.Felpakolas(9, "Mi a neme?", ["Férfi", "Nő", "Nem akarom megadni"], false)

var index = 1;

window.addEventListener('load', function () {
    Betoltes(index);
});


function Betoltes(i) {

    const oldal = document.getElementById("Kerdesek");
    const adat = {}
    for (const x of kerd.kerdesek) {
        if (x.Id == i) {
            for (var kulcs in x) {
                if (x.hasOwnProperty(kulcs)) {
                    adat[kulcs] = x[kulcs];
                }
            }
            break;
        }
    }



    oldal.innerHTML = `
    <h1 class="mt-4 p3 text-center" >${adat.kerdes} </h1>
    <hr>
    <form id="Form" class="p-3 g-3"> </form>`

    Valasz_lehetosegek(adat);

    let szoveg = ""
    if (index == kerd.kerdesek.length) { szoveg = "Befejezés" }
    else { szoveg = "Következő" }

    oldal.innerHTML += `
    <div class="text-end p-3 ">
        <button type="button" class="btn btn-secondary btn-lg" id="btn" onclick="Elozo()">Előző</button>
        <button type="button"  class="btn btn-success btn-lg"  id="kov" onclick="Kovetkezo()">${szoveg}</button>
    </div>
    <div class="   text-center " id="helyzet"></div> `;



    Gombok();
}

function Valasz_lehetosegek(valaszok) {
    const ker = document.getElementById("Form");
    ker.innerHTML = "";
    let lep = 1;
    for (const val of valaszok.valasz) {
        ker.innerHTML += `<label class="h3">
        <input type="radio" name="valasz" value="${lep}"   class="big-radio">${val}</label><br>`;
        lep++;
    }

}

function ugras(ugras) {

    index = ugras;
    Betoltes(index);
}

function Gombok() {
    const helyzet = document.getElementById("helyzet");
    helyzet.innerHTML = "";
    for (const x of kerd.kerdesek) {
        if (x.Id == index) {
            helyzet.innerHTML += `<button class="btn m-1 p-2  col-1 btn-success" onclick="ugras(${x.Id})">${x.Id}</button>`;
        } else if (x.megcsinalta) {
            helyzet.innerHTML += `<button class="btn m-1 p-2  col-1 btn-secondary" onclick="ugras(${x.Id})">${x.Id}</button>`;
        } else {
            helyzet.innerHTML += `<button class="btn m-1 p-2  col-1 btn-warning" onclick="ugras(${x.Id})">${x.Id}</button>`;
        }

    }


}

var kitoltes_eredmeny = [];

function Kovetkezo() {
    const selected = document.querySelector('input[name="valasz"]:checked');
    const valasz = selected ? selected.value : 0;

   
     if (index == kerd.kerdesek.length) {

        if ((valasz > 0 || kerd.kerdesek[index - 1].megcsinalta)) {

            kerd.kerdesek[index - 1].megcsinalta = true
          //  kitoltes_eredmeny.push({ kerdes: index, valasz: valasz })
            Befejezes();
        }
        else {
            alert("jelöljön meg valamelyik választ")
        }
    }
    else if (index < kerd.kerdesek.length && (valasz > 0 || kerd.kerdesek[index-1].megcsinalta)) {

        kerd.kerdesek[index - 1].megcsinalta = true
        //kitoltes_eredmeny.push({ kerdes: index, valasz: valasz })
        index += 1
        Betoltes(index)
    }
    else {
        alert("jelöljön meg valamelyik választ")
    }

}


function Befejezes() {

    const oldal = document.getElementById("Kerdesek");
    const befejezett = kerd.kerdesek.every(n => n.megcsinalta);
    if (!befejezett) { alert("Kérem töltse ki a tesztet, mert igy nem lehet beküldeni!") }
    else {

       // kerd.Kitoltotes(kitoltes_eredmeny)
       // kitoltes_eredmeny = {}
        oldal.innerHTML = `  
    <h1 class="mt-4 p3 text-center"> Köszönjük hogy kitöltötte a tesztet </h1>
     <br>
    <div class="container">
        <div class="row">
            <div class="col-6 ">
                <h4>Ha szeretne átmehet az ajánlás oldalra</h4>
                <a href="#"><button class="btn btn-primary btn-lg">Ajánlás</button></a>
            </div>
            <div class="col-6">
                <h4>Vagy Viszatérhet a főoldalra</h4>
                <a href="#"><button class="btn btn-primary btn-lg">Kérdőív</button></a>
            </div>
            
        </div>
    </div>`
    }
/*
    <div class="col-12">
                <h4>kitöltés eredmény</h4>
                <button class="btn btn-primary btn-lg " onclick="Eredmeny()">Eredmény</button>
                
            </div>*/

}

function Elozo() {

    if (index == 1) {
        alert("Ettől viszább nem lehet menni!")
    }
    else if (index <= kerd.kerdesek.length) {
        index -= 1
        Betoltes(index)
    }

}

/*
function Eredmeny() {
    const oldal = document.getElementById("Kerdesek");

    oldal.innerHTML = `<h1> Ennyien töltötték ki ${kerd.Kitoltesek.length}`

}
    */
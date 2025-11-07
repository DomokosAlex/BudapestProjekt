class Kerdes {
    constructor(sorszam, szoveg, valaszok, megcsinalta, tipus) {
        this.sorszam = sorszam;
        this.szoveg = szoveg;
        this.valaszok = valaszok; 
        this.megcsinalta = false; 
        this.tipus = tipus;
    }
}

const kerdesek = [

    new Kerdes(1, "Hallott-e már a glicin aminósavról?", [
        "Igen, és tudom, mire való",
        "Igen, de nem tudom pontosan",
        "Nem, még soha nem hallottam",
        "Először az oldalunkon olvastam róla"
    ], false, "Hallott-e"),

    new Kerdes(2, "Ha hallott róla, honnan szerezte az információt?", [
        "Orvostól, dietetikustól",
        "Egészségügyi / tudományos oldalról",
        "Baráttól, ismerőstől",
        "Közösségi médiából / fórumokról",
        "Egyéb / nem tudom",
        "Nem hallottam"
    ], false, "Honnan hallott"),

    
    new Kerdes(3, "Milyen nemzetiségű?", [
        "Magyar",
        "Szomszédos ország",
        "Egyéb"
    ], false, "Nemzetiség"),

    
    new Kerdes(4, "Hol él jelenleg?", [
        "Magyarország",
        "Szomszédos ország",
        "Más, távolabbi ország"
    ], false, "Ország"),

    
    new Kerdes(5, "Mi a neme?", [
        "Férfi",
        "Nő",
        "Nem szeretném megadni",
        "Egyéb",
    ], false, "Nem"),


    new Kerdes(6, "Milyen jellegű településen él?", [
        "Nagyváros / városközpont",
        "Külváros",
        "Kisváros",
        "Vidék / falu"
    ], false, "Lakhely"),


    new Kerdes(7, "Milyen korosztályba tartozik?", [
        "18 év alatti",
        "18–25 év",
        "26–35 év",
        "36–45 év",
        "46–60 év",
        "61 év és feljebb"
    ], false, "Életkor"),

    
    new Kerdes(8, "Hogyan jellemezné az egészségi állapotát?", [
        "Kiváló",
        "Jó",
        "Közepes",
        "Rossz",
        "Nagyon rossz"
    ], false, "Egészségi állapot"),

    new Kerdes(9, "Mi a legmagasabb iskolai végzettsége?", [
        "Általános iskola",
        "Középiskola / érettségi",
        "Felsőfokú szakképzés",
        "Egyetem / főiskola",
        "Posztgraduális"
    ], false, "Végzettség")
];
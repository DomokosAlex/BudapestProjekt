const kerdesek_json = require("./kerdoiv_kerdesek.json");
const ajan_kerdesek = require("./ajanlas_kerdesek.json");

function ValidalasKerdoiv(valaszok) {

    try {
        if (!Array.isArray(valaszok)) return false;
        if (valaszok.length != kerdesek_json.length) return false;

        for (let i = 0; i < kerdesek_json.length; i++) {

            if (kerdesek_json[i].id != valaszok[i].id
                || valaszok[i].valasztott > kerdesek_json[i].valaszlehetosegek.length - 1
                || valaszok[i].valasztott < 0
                || !Number.isInteger(valaszok[i].valasztott))
                return false;

        }

        return true;
    } catch {
        return false;
    }


}

function ValidalasAjanlas(valaszok) {

    try {
        if (!Array.isArray(valaszok)) return false;
        if (valaszok.length != ajan_kerdesek.length) return false;


        for (let i = 0; i < ajan_kerdesek.length; i++) {

            if (ajan_kerdesek[i].id != valaszok[i].id
                || valaszok[i].valasztott > ajan_kerdesek[i].valaszok.length - 1
                || valaszok[i].valasztott < 0
                || !Number.isInteger(valaszok[i].valasztott))
                return false;

        }

        return true;
    } catch {
        return false;
    }


}

module.exports = { ValidalasKerdoiv, ValidalasAjanlas };
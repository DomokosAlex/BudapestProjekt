const STORAGE_KEY = 'cookie_consent_analytics';

function hasConsent() {
    return localStorage.getItem(STORAGE_KEY) === 'true';
}


function loadAnalytics() {
    //google cucc
}

function Banner() {

    if (hasConsent()) {
        document.getElementById("Adatved").style.display = "none";
    } else {
        document.getElementById("Adatved").style.display = "block";
    }
}


document.getElementById("elfogadom").addEventListener("click", function () {
    localStorage.setItem(STORAGE_KEY, 'true');
    Banner();
});

document.addEventListener("DOMContentLoaded", function(){
    Banner();
})





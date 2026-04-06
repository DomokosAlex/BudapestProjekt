const STORAGE_KEY = 'cookie_consent_analytics';
const STORAGE_KEY_DECISION = 'cookie_decision_made';



function hasConsent() {
    return localStorage.getItem(STORAGE_KEY) === 'true';
}

function hasPressed() {
    return localStorage.getItem(STORAGE_KEY_DECISION) === 'true';
}



function initConsentMode() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };

    // Default state (before user decides)
    gtag('consent', 'default', {
        analytics_storage: 'denied'
    });
}



function loadGoogleAnalytics() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-CP886CYHY8";

    script.onload = function () {
        gtag('js', new Date());


        gtag('config', 'G-CP886CYHY8');
    };

    document.head.appendChild(script);
}



function Banner() {
    const banner = document.getElementById("Adatved");
    if (!banner) return;
    banner.style.display = hasPressed() ? "none" : "block";
}



document.addEventListener("DOMContentLoaded", function () {
    initConsentMode();
    if (hasConsent()) loadGoogleAnalytics();
    Banner();
});


const elfogadom = document.getElementById("elfogadom");
if (elfogadom) {
    elfogadom.addEventListener("click", function () {
        localStorage.setItem(STORAGE_KEY, 'true');
        localStorage.setItem(STORAGE_KEY_DECISION, 'true');
        gtag('consent', 'update', { analytics_storage: 'granted' });
        loadGoogleAnalytics();
        Banner();
    });
}

const elutasit = document.getElementById("elutasit");
if (elutasit) {
    elutasit.addEventListener("click", function () {
        localStorage.setItem(STORAGE_KEY, 'false');
        localStorage.setItem(STORAGE_KEY_DECISION, 'true');
        gtag('consent', 'update', { analytics_storage: 'denied' });
        Banner();
    });
}
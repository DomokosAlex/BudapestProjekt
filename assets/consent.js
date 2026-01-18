console.log('CONSENT JS LOADED');

(function () {
  const STORAGE_KEY = 'cookie_consent_analytics';

  function hasConsent() {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  }

  function setConsent() {
    localStorage.setItem(STORAGE_KEY, 'true');
  }

  function loadAnalytics() {
    // IDE JÖN MAJD A GA KÓD (következő lépésben)
    // console.log('Analytics betöltve');
  }

  function createBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-banner-inner">
        <p>
          Ez az oldal statisztikai célú sütiket használ a látogatottság mérésére.
          <a href="#" data-privacy-link>Adatvédelmi tájékoztató</a>
        </p>
        <button type="button">Elfogadom</button>
      </div>
    `;

    banner.querySelector('button').addEventListener('click', () => {
      setConsent();
      banner.remove();
      loadAnalytics();
    });

    document.body.appendChild(banner);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (hasConsent()) {
      loadAnalytics();
    } else {
      createBanner();
    }
  });
})();

function openPrivacyModal() {
  document.getElementById('privacy-modal').style.display = 'block';
}

function closePrivacyModal() {
  document.getElementById('privacy-modal').style.display = 'none';
}

document.addEventListener('click', function (e) {
  const link = e.target.closest('[data-privacy-link]');
  if (!link) return;

  e.preventDefault();
  openPrivacyModal();
});


document.addEventListener('click', function (e) {
  if (e.target.classList.contains('privacy-backdrop') ||
      e.target.classList.contains('privacy-close')) {
    closePrivacyModal();
  }
});



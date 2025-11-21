// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('preferredLang') || 'en';

    // Initialize language
    setLanguage(currentLang);

    // Toggle Event Listener
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = document.documentElement.lang === 'en' ? 'ko' : 'en';
            setLanguage(newLang);
        });
    }
});

function setLanguage(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Save preference
    localStorage.setItem('preferredLang', lang);

    // Update Toggle Button Text
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'en' ? '한국어' : 'English';
    }

    // Update Content
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}


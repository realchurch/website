console.log('Main.js starting...');
import translations, { registerArticles } from './translations-manager.js?v=6';
console.log('Translations imported in Main.js');
import { initArticleLoader } from './article-loader.js?v=6';
import { articleService } from './article-service.js?v=6';

// Load articles asynchronously
articleService.loadArticles().then(articles => {
    registerArticles(articles);
    initArticleLoader(articles);
}).catch(error => {
    console.error('Failed to load articles:', error);
});

// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Article Loader if we are on articles page or article detail page
    // We can just run it, it checks for elements
    // initArticleLoader(); // This is now handled by the async article loading flow

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

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
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


import { articles } from './data/articles.js';
import translations from './translations-manager.js';

export function initArticleLoader() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (articleId) {
        loadArticleDetail(articleId);
    } else {
        loadArticleList();
    }
}

function loadArticleList() {
    const listContainer = document.querySelector('.article-list');
    if (!listContainer) return;

    // Clear existing content if any (though we might want to keep a skeleton)
    listContainer.innerHTML = '';

    // Sort articles by date (newest first) - assuming date string is parseable or we add a raw date field
    // For now, just reverse order of array to show newest added first if they are added chronologically
    const sortedArticles = [...articles].reverse();

    sortedArticles.forEach(article => {
        const articleEl = document.createElement('article');
        articleEl.className = 'article-item';

        // We use data-i18n attributes for dynamic translation switching
        // The keys will be like "article1.title", "article1.excerpt"

        articleEl.innerHTML = `
            <span class="article-date" data-i18n="${article.id}.date">${article.en.date}</span>
            <h2 class="article-title">
                <a href="article.html?id=${article.id}" data-i18n="${article.id}.title">${article.en.title}</a>
            </h2>
            <p class="article-excerpt" data-i18n="${article.id}.excerpt">${article.en.excerpt}</p>
            <a href="article.html?id=${article.id}" class="read-more" data-i18n="article.read_more">Read Full Article &rarr;</a>
        `;

        listContainer.appendChild(articleEl);
    });

    // Re-run translation update to ensure correct language is displayed
    const currentLang = document.documentElement.lang || 'en';
    updatePageTranslations(currentLang);
}

function loadArticleDetail(id) {
    const article = articles.find(a => a.id === id);
    if (!article) {
        document.querySelector('main').innerHTML = '<div class="container"><p>Article not found.</p></div>';
        return;
    }

    // Update Page Title
    document.title = `${article.en.title} | Rev. Choi Jong-in`;

    // We need to populate the template
    // Assuming article.html has specific elements with IDs or classes

    const titleEl = document.getElementById('article-title');
    const dateEl = document.getElementById('article-date');
    const contentEl = document.getElementById('article-content');
    const authorEl = document.getElementById('article-author');

    if (titleEl) {
        titleEl.setAttribute('data-i18n', `${id}.title`);
        titleEl.textContent = article.en.title; // Default
    }
    if (dateEl) {
        dateEl.setAttribute('data-i18n', `${id}.date`);
        dateEl.textContent = article.en.date;
    }
    if (authorEl) {
        // We need to ensure the full article ID mapping exists in translations-manager
        // The manager maps article1 -> articlefull1 for full content
        // Let's check how translations-manager handles this.
        // It maps article.id -> articlefull{id} for content/author/date

        // Actually, looking at translations-manager.js:
        // const fullId = id.replace('article', 'articlefull');
        // So if id is "article1", fullId is "articlefull1"

        // But wait, the list view uses "article1.title".
        // The detail view should probably use the same keys if possible, or the "full" keys.
        // In translations-manager.js:
        // set('en', `${id}.title`, article.en.title); -> "article1.title"
        // set('en', `${fullId}.title`, article.en.title); -> "articlefull1.title"

        // So we can use either. Let's use the full ID for content to be safe as it might be different?
        // Actually in the data they are the same.
        // But content is ONLY in the full mapping?
        // set('en', `${fullId}.content`, article.en.content);

        // So for content we MUST use the full ID.
        const fullId = id.replace('article', 'articlefull');

        if (contentEl) {
            contentEl.setAttribute('data-i18n', `${fullId}.content`);
            contentEl.innerHTML = article.en.content;
        }

        if (authorEl) {
            authorEl.setAttribute('data-i18n', `${fullId}.author`);
            authorEl.textContent = article.en.author;
        }

        // Also update title/date to use fullId if we want consistency, or just keep using the simple id
        // The simple ID is fine for title/date as they are mapped to the same value.
    }

    // Re-run translation update
    const currentLang = document.documentElement.lang || 'en';
    updatePageTranslations(currentLang);
}

// Helper to trigger translation update from main.js logic
// We might need to export the setLanguage function from main.js or just trigger the event
function updatePageTranslations(lang) {
    // This duplicates logic from main.js slightly but ensures we update newly added elements
    // Ideally main.js exposes a method, but for now we can rely on the global translations object if available
    // or just re-dispatch the event if main.js listens to it?
    // main.js doesn't listen to a custom event for this, it has a function setLanguage.

    // Let's try to access the global logic if possible, or just manually update
    // Since we imported translations, we can do it here.

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

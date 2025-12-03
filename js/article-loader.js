import translations from './translations-manager.js?v=6';

export function initArticleLoader(articles) {
    console.log('initArticleLoader called with', articles ? articles.length : 'undefined', 'articles');
    console.log('Window location:', window.location.href);
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    console.log('Article ID from URL:', articleId);

    if (!articles) {
        console.error('Articles not provided to initArticleLoader');
        return;
    }

    if (articleId) {
        const article = articles.find(a => a.id === articleId);
        console.log('Found article:', article ? article.id : 'null');
        if (article) {
            loadArticleDetail(article, articleId);
        } else {
            console.error('Article not found for ID:', articleId);
            document.querySelector('main').innerHTML = '<div class="container"><p>Article not found.</p></div>';
        }
    } else {
        loadArticleList(articles);
    }
}

function loadArticleList(articles) {
    const listContainer = document.querySelector('.article-list');
    if (!listContainer) return;

    // Clear existing content
    listContainer.innerHTML = '';

    // Sort articles by date (newest first) - assuming input order is chronological, so reverse
    const sortedArticles = [...articles].reverse();

    sortedArticles.forEach(article => {
        const articleEl = document.createElement('article');
        articleEl.className = 'article-item';

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

    // Re-run translation update
    const currentLang = document.documentElement.lang || 'en';
    updatePageTranslations(currentLang);
}

function loadArticleDetail(article, id) {
    console.log('loadArticleDetail called for:', id);

    // Update Page Title
    document.title = `${article.en.title} | Rev. Choi Jong-in`;

    const titleEl = document.getElementById('article-title');
    const dateEl = document.getElementById('article-date');
    const contentEl = document.getElementById('article-content');
    const authorEl = document.getElementById('article-author');

    console.log('Elements found:', {
        title: !!titleEl,
        date: !!dateEl,
        content: !!contentEl,
        author: !!authorEl
    });

    if (titleEl) {
        console.log('Setting title to:', article.en.title);
        titleEl.setAttribute('data-i18n', `${id}.title`);
        titleEl.textContent = article.en.title;
        console.log('Title element content after set:', titleEl.textContent);
    }
    if (dateEl) {
        dateEl.setAttribute('data-i18n', `${id}.date`);
        dateEl.textContent = article.en.date;
    }

    // Full content uses 'articlefull' prefix in translations
    const fullId = id.replace('article', 'articlefull');

    if (contentEl) {
        contentEl.setAttribute('data-i18n', `${fullId}.content`);
        contentEl.innerHTML = article.en.content;
    }

    if (authorEl) {
        authorEl.setAttribute('data-i18n', `${fullId}.author`);
        authorEl.textContent = article.en.author;
    }

    // Re-run translation update
    const currentLang = document.documentElement.lang || 'en';
    updatePageTranslations(currentLang);
}

function updatePageTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (key.includes('.content')) {
                el.innerHTML = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
}

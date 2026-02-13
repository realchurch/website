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

    const articlePathMap = {
    "article1": "article-beings-in-heaven.html",
    "article2": "article-caregiving-war.html",
    "article3": "article-gray-rhino-moon.html",
    "article4": "article-9-blessings-old-age.html",
    "article5": "article-5.html",
    "article6": "article-6.html",
    "article7": "article-7.html",
    "article8": "article-8.html",
    "article9": "article-9.html",
    "article10": "article-10.html",
    "article11": "article-11.html",
    "article12": "article-12.html",
    "article13": "article-13.html",
    "article14": "article-14.html",
    "article15": "article-15.html",
    "article16": "article-16.html",
    "article17": "article-17.html",
    "article18": "article-18.html",
    "article19": "article-19.html",
    "article20": "article-20.html",
    "article21": "article-21.html",
    "article22": "article-22.html",
    "article23": "article-23.html",
    "article24": "article-24.html",
    "article25": "article-25.html",
    "article26": "article-26.html",
    "article27": "article-27.html",
    "article28": "article-28.html",
    "article29": "article-29.html",
    "article30": "article-30.html",
    "article31": "article-31.html",
    "article32": "article-32.html",
    "article33": "article-33.html",
    "article34": "article-34.html",
    "article35": "article-35.html",
    "article36": "article-36.html",
    "article37": "article-37.html",
    "article38": "article-38.html",
    "article39": "article-39.html",
    "article40": "article-40.html",
    "article41": "article-41.html",
    "article42": "article-42.html",
    "article43": "article-43.html"
};

    sortedArticles.forEach(article => {
        const articleUrl = articlePathMap[article.id] || 'articles.html';
        const articleEl = document.createElement('article');
        articleEl.className = 'article-item';

        articleEl.innerHTML = `
            <span class="article-date" data-i18n="${article.id}.date">${article.en.date}</span>
            <h2 class="article-title">
                <a href="${articleUrl}" data-i18n="${article.id}.title">${article.en.title}</a>
            </h2>
            <p class="article-excerpt" data-i18n="${article.id}.excerpt">${article.en.excerpt}</p>
            <a href="${articleUrl}" class="read-more" data-i18n="article.read_more">Read Full Article &rarr;</a>
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

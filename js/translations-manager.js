import { ui } from './data/ui.js';
import { books } from './data/books.js';
import { articles } from './data/articles.js';
import { about } from './data/about.js';

const translations = {
    en: {},
    ko: {}
};

// Helper to set translation
function set(lang, key, value) {
    translations[lang][key] = value;
}

// 1. UI Strings
// Nav
Object.keys(ui.nav).forEach(key => {
    set('en', `nav.${key}`, ui.nav[key].en);
    set('ko', `nav.${key}`, ui.nav[key].ko);
});

// Hero
Object.keys(ui.hero).forEach(key => {
    set('en', `hero.${key}`, ui.hero[key].en);
    set('ko', `hero.${key}`, ui.hero[key].ko);
});

// Common
set('en', 'featured.title', ui.common.featured_title.en);
set('ko', 'featured.title', ui.common.featured_title.ko);
set('en', 'btn.learn_more', ui.common.btn_learn_more.en);
set('ko', 'btn.learn_more', ui.common.btn_learn_more.ko);
set('en', 'btn.buy_now', ui.common.btn_buy_now.en);
set('ko', 'btn.buy_now', ui.common.btn_buy_now.ko);
set('en', 'footer.rights', ui.common.footer_rights.en);
set('ko', 'footer.rights', ui.common.footer_rights.ko);

// Books Page UI
set('en', 'books.hero.title', ui.books_page.hero_title.en);
set('ko', 'books.hero.title', ui.books_page.hero_title.ko);
set('en', 'books.hero.desc', ui.books_page.hero_desc.en);
set('ko', 'books.hero.desc', ui.books_page.hero_desc.ko);

// Articles Page UI
set('en', 'articles.hero.title', ui.articles_page.hero_title.en);
set('ko', 'articles.hero.title', ui.articles_page.hero_title.ko);
set('en', 'articles.hero.desc', ui.articles_page.hero_desc.en);
set('ko', 'articles.hero.desc', ui.articles_page.hero_desc.ko);
set('en', 'article.read_more', ui.articles_page.read_more.en);
set('ko', 'article.read_more', ui.articles_page.read_more.ko);
set('en', 'article.back', ui.articles_page.back.en);
set('ko', 'article.back', ui.articles_page.back.ko);

// About Page UI
set('en', 'about.hero.title', ui.about_page.hero_title.en);
set('ko', 'about.hero.title', ui.about_page.hero_title.ko);
set('en', 'about.contact', ui.about_page.contact.en);
set('ko', 'about.contact', ui.about_page.contact.ko);
set('en', 'about.contact.desc', ui.about_page.contact_desc.en);
set('ko', 'about.contact.desc', ui.about_page.contact_desc.ko);


// 2. Books Data
books.forEach((book, index) => {
    const key = `book${index + 1}`; // book1, book2...
    // If ID is different, we might want to use ID, but existing HTML uses book1, book2
    // Let's assume the order in the array matches book1, book2...
    // Or we can use book.id if it matches "book1"

    const id = book.id; // "book1"

    set('en', `${id}.title`, book.en.title);
    set('ko', `${id}.title`, book.ko.title);

    set('en', `${id}.desc`, book.en.desc);
    set('ko', `${id}.desc`, book.ko.desc);
});

// 3. Articles Data
articles.forEach((article, index) => {
    const id = article.id; // "article1"

    // Summary (for list page)
    set('en', `${id}.title`, article.en.title);
    set('ko', `${id}.title`, article.ko.title);

    set('en', `${id}.excerpt`, article.en.excerpt);
    set('ko', `${id}.excerpt`, article.ko.excerpt);

    // Full Content (for detail page)
    // The existing keys are articlefull1.title, articlefull1.content, etc.
    // We need to map article1 -> articlefull1
    const fullId = id.replace('article', 'articlefull');

    set('en', `${fullId}.title`, article.en.title);
    set('ko', `${fullId}.title`, article.ko.title);

    set('en', `${fullId}.author`, article.en.author);
    set('ko', `${fullId}.author`, article.ko.author);

    set('en', `${fullId}.date`, article.en.date);
    set('ko', `${fullId}.date`, article.ko.date);

    set('en', `${fullId}.content`, article.en.content);
    set('ko', `${fullId}.content`, article.ko.content);
});

// 4. About Bio
set('en', 'about.bio.p1', about.bio.p1.en);
set('ko', 'about.bio.p1', about.bio.p1.ko);
set('en', 'about.bio.p2', about.bio.p2.en);
set('ko', 'about.bio.p2', about.bio.p2.ko);
set('en', 'about.bio.p3', about.bio.p3.en);
set('ko', 'about.bio.p3', about.bio.p3.ko);

export default translations;

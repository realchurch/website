import fs from 'node:fs';
import path from 'node:path';
import { articles } from '../js/data/articles.js';

const root = '/Users/peter/Documents/GitHub/realchurch';
const koRoot = path.join(root, 'ko');
const SITE_URL = 'https://jonginchoi.com';
const OG_IMAGE = `${SITE_URL}/images/profile.png`;
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const KEYWORDS_EN = [
  'Rev. Choi Jong-in',
  'Christian pastor',
  'pastor emeritus',
  'theologian',
  'pastoral care',
  'Christian books',
  'theology',
  'worship',
  'faith',
  'suicide prevention',
  'caregiving',
  'caregiver guidance',
  'Korean Christianity',
];
const KEYWORDS_KO = [
  '최종인 목사',
  '기독교',
  '신학',
  '목회',
  '돌봄',
  '자살 예방',
  '암환자 돌봄',
  '노년 커뮤니케이션',
  '천국',
  '예배',
  '평화성결교회',
];

if (!fs.existsSync(koRoot)) fs.mkdirSync(koRoot, { recursive: true });

const slugMap = {
  article1: 'article-beings-in-heaven.html',
  article2: 'article-caregiving-war.html',
  article3: 'article-gray-rhino-moon.html',
  article4: 'article-9-blessings-old-age.html'
};

function pageNameFor(id) {
  if (slugMap[id]) return slugMap[id];
  const num = id.replace('article', '');
  return `article-${num}.html`;
}

function escapeHtml(s = '') {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function stripHtml(s = '') {
  return s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function descFrom(article, lang) {
  const excerpt = article?.[lang]?.excerpt || '';
  const content = stripHtml(article?.[lang]?.content || '');
  const raw = excerpt || content;
  return raw.slice(0, 155);
}

function absolute(lang, file) {
  return lang === 'ko'
    ? `${SITE_URL}/ko/${file}`
    : `${SITE_URL}/${file}`;
}

function articleHtml(article, lang, file) {
  const isKo = lang === 'ko';
  const t = article[lang];
  const otherFile = file;
  const selfUrl = absolute(lang, file);
  const enUrl = absolute('en', otherFile);
  const koUrl = absolute('ko', otherFile);
  const canonical = isKo ? koUrl : enUrl;
  const otherUrl = isKo ? `../${otherFile}` : `ko/${otherFile}`;
  const backUrl = isKo ? 'articles.html' : 'articles.html';
  const css = isKo ? '../css/styles.css' : 'css/styles.css';
  const js = isKo ? '../js/main.js' : 'js/main.js';
  const icon = isKo ? '../favicon.png' : 'favicon.png';
  const home = isKo ? 'index.html' : 'index.html';
  const books = isKo ? 'books.html' : 'books.html';
  const about = isKo ? 'about.html' : 'about.html';
  const author = t.author || (isKo ? '최종인 목사' : 'Rev. Choi Jong-in');
  const date = t.date || '';
  const title = t.title || article.en.title || article.id;
  const description = escapeHtml(descFrom(article, lang));
  const ogLocale = isKo ? 'ko_KR' : 'en_US';
  const ogAltLocale = isKo ? 'en_US' : 'ko_KR';
  const languageName = isKo ? 'English' : '한국어';
  const backText = isKo ? '← 칼럼 목록으로' : '← Back to Articles';
  const keywordContent = isKo
    ? `${KEYWORDS_KO.join(', ')}, ${title}`
    : `${KEYWORDS_EN.join(', ')}, ${title}`;

  return `<!DOCTYPE html>
<html lang="${isKo ? 'ko' : 'en'}">

<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-GXR5DWRT70"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-GXR5DWRT70');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)} | ${isKo ? '최종인 목사' : 'Rev. Choi Jong-in'}</title>
    <meta name="description" content="${description}">
    <meta name="author" content="${isKo ? '최종인 목사' : 'Rev. Choi Jong-in'}">

    <link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="en" href="${enUrl}">
    <link rel="alternate" hreflang="ko" href="${koUrl}">
    <link rel="alternate" hreflang="x-default" href="${enUrl}">

    <link rel="icon" type="image/png" href="${icon}">

    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${OG_IMAGE}">
    <meta property="og:url" content="${selfUrl}">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="${ogLocale}">
    <meta property="og:locale:alternate" content="${ogAltLocale}">
    <meta name="keywords" content="${escapeHtml(keywordContent)}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${OG_IMAGE}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${css}">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": ${JSON.stringify(title)},
      "description": ${JSON.stringify(stripHtml(descFrom(article, lang)))},
      "keywords": ${JSON.stringify(escapeHtml(keywordContent))},
      "author": {"@type": "Person", "name": ${JSON.stringify(isKo ? '최종인 목사' : 'Rev. Choi Jong-in')}},
      "inLanguage": ${JSON.stringify(isKo ? 'ko' : 'en')},
      "mainEntityOfPage": ${JSON.stringify(selfUrl)}
    }
    </script>

    <style>
        .article-header { padding: 4rem 0 2rem; border-bottom: 1px solid rgba(74, 59, 50, 0.1); }
        .article-title { font-size: 2.5rem; margin-bottom: 1rem; line-height: 1.2; }
        .article-meta { color: #888; font-size: 0.9rem; margin-bottom: 2rem; }
        .article-content { max-width: 800px; margin: 0 auto; padding: 3rem 0; font-size: 1.1rem; line-height: 1.8; }
        .article-content h2 { font-size: 1.8rem; margin: 2.5rem 0 1rem; color: var(--primary-color); }
        .article-content p { margin-bottom: 1.5rem; }
        .article-content ul { margin-bottom: 1.5rem; padding-left: 2rem; }
        .back-link { display: inline-block; margin-bottom: 2rem; color: var(--accent-color); text-decoration: none; font-weight: bold; }
        .back-link:hover { text-decoration: underline; }
    </style>
</head>

<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">${isKo ? '최종인 목사' : 'Rev. Choi Jong-in'}</div>
                <div class="hamburger"><span></span><span></span><span></span></div>
                <ul class="nav-links">
                    <li><a href="${home}">${isKo ? '홈' : 'Home'}</a></li>
                    <li><a href="${books}">${isKo ? '저서' : 'Books'}</a></li>
                    <li><a href="${backUrl}" class="active">${isKo ? '칼럼' : 'Articles'}</a></li>
                    <li><a href="${about}">${isKo ? '소개' : 'About'}</a></li>
                    <li><a href="${otherUrl}" hreflang="${isKo ? 'en' : 'ko'}" lang="${isKo ? 'en' : 'ko'}">${languageName}</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="article-header">
            <div class="container">
                <a href="${backUrl}" class="back-link">${backText}</a>
                <h1 class="article-title">${escapeHtml(title)}</h1>
                <div class="article-meta">${escapeHtml(author)}${date ? ` | ${escapeHtml(date)}` : ''}</div>
            </div>
        </section>

        <section class="article-content">
            <div class="container">
                ${t.content || ''}
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2026 ${isKo ? '최종인 목사' : 'Rev. Choi Jong-in'}. All rights reserved.</p>
        </div>
    </footer>

    <script type="module" src="${js}"></script>
</body>

</html>
`;
}

const sorted = [...articles].reverse();

for (const a of sorted) {
  const file = pageNameFor(a.id);
  fs.writeFileSync(path.join(root, file), articleHtml(a, 'en', file));
  fs.writeFileSync(path.join(koRoot, file), articleHtml(a, 'ko', file));
}

function listPage(lang) {
  const isKo = lang === 'ko';
  const filePrefix = isKo ? 'ko/' : '';
  const selfUrl = absolute(lang, 'articles.html');
  const enUrl = absolute('en', 'articles.html');
  const koUrl = absolute('ko', 'articles.html');
  const listKeywordContent = isKo
    ? `${KEYWORDS_KO.join(', ')}, 신앙 칼럼, 목회 칼럼`
    : `${KEYWORDS_EN.join(', ')}, Christian reflections, ministry articles`;
  const css = isKo ? '../css/styles.css' : 'css/styles.css';
  const js = isKo ? '../js/main.js' : 'js/main.js';
  const icon = isKo ? '../favicon.png' : 'favicon.png';
  const langLink = isKo ? '../articles.html' : 'ko/articles.html';
  const langLabel = isKo ? 'English' : '한국어';

  const items = sorted.map((a) => {
    const f = pageNameFor(a.id);
    const t = a[lang];
    return `                    <article class="article-item">\n                        <span class="article-date">${escapeHtml(t.date || '')}</span>\n                        <h2 class="article-title"><a href="${f}">${escapeHtml(t.title || a.id)}</a></h2>\n                        <p class="article-excerpt">${escapeHtml(t.excerpt || '')}</p>\n                        <a href="${f}" class="read-more">${isKo ? '전체 읽기 &rarr;' : 'Read Full Article &rarr;'}</a>\n                    </article>`;
  }).join('\n\n');

  const listSchema = sorted.map((a, i) => {
    const f = pageNameFor(a.id);
    return `        {"@type":"ListItem","position":${i + 1},"url":"${SITE_URL}/${filePrefix}${f}","name":${JSON.stringify((a[lang].title || a.id))}}`;
  }).join(',\n');

  return `<!DOCTYPE html>
<html lang="${isKo ? 'ko' : 'en'}">

<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-GXR5DWRT70"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-GXR5DWRT70');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${isKo ? '최종인 목사 칼럼' : 'Articles by Rev. Choi Jong-in'}</title>
    <meta name="description" content="${isKo ? '신앙, 신학, 돌봄 사역, 그리스도인의 삶에 관한 최종인 목사의 칼럼 모음.' : 'Articles and reflections by Rev. Choi Jong-in on Christian faith, theology, caregiving, and ministry.'}">
    <meta name="author" content="${isKo ? '최종인 목사' : 'Rev. Choi Jong-in'}">

    <link rel="canonical" href="${selfUrl}">
    <link rel="alternate" hreflang="en" href="${enUrl}">
    <link rel="alternate" hreflang="ko" href="${koUrl}">
    <link rel="alternate" hreflang="x-default" href="${enUrl}">

    <link rel="icon" type="image/png" href="${icon}">

    <meta property="og:title" content="${isKo ? '최종인 목사 칼럼' : 'Articles by Rev. Choi Jong-in'}">
    <meta property="og:description" content="${isKo ? '신앙과 목회에 관한 칼럼과 묵상.' : 'Theology and ministry articles by Rev. Choi Jong-in.'}">
    <meta property="og:image" content="${OG_IMAGE}">
    <meta property="og:url" content="${selfUrl}">
    <meta property="og:type" content="website">
    <meta name="keywords" content="${escapeHtml(listKeywordContent)}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${isKo ? '최종인 목사 칼럼' : 'Articles by Rev. Choi Jong-in'}">
    <meta name="twitter:description" content="${isKo ? '신앙과 목회에 관한 칼럼과 묵상.' : 'Theology and ministry articles by Rev. Choi Jong-in.'}">
    <meta name="twitter:image" content="${OG_IMAGE}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${css}">
    <style>
        .article-list { max-width: 800px; margin: 0 auto; }
        .article-item { margin-bottom: 4rem; border-bottom: 1px solid rgba(74, 59, 50, 0.1); padding-bottom: 2rem; }
        .article-item:last-child { border-bottom: none; }
        .article-date { font-size: 0.9rem; color: #888; margin-bottom: 0.5rem; display: block; }
        .article-title { font-size: 2rem; margin-bottom: 1rem; }
        .article-excerpt { font-size: 1.1rem; margin-bottom: 1.5rem; }
        .read-more { color: var(--accent-color); font-weight: bold; text-decoration: none; }
        .read-more:hover { text-decoration: underline; }
    </style>

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
${listSchema}
      ]
    }
    </script>
</head>

<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">${isKo ? '최종인 목사' : 'Rev. Choi Jong-in'}</div>
                <div class="hamburger"><span></span><span></span><span></span></div>
                <ul class="nav-links">
                    <li><a href="index.html">${isKo ? '홈' : 'Home'}</a></li>
                    <li><a href="books.html">${isKo ? '저서' : 'Books'}</a></li>
                    <li><a href="articles.html" class="active">${isKo ? '칼럼' : 'Articles'}</a></li>
                    <li><a href="about.html">${isKo ? '소개' : 'About'}</a></li>
                    <li><a href="${langLink}" hreflang="${isKo ? 'en' : 'ko'}" lang="${isKo ? 'en' : 'ko'}">${langLabel}</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero" style="padding-bottom: 2rem;">
            <div class="container">
                <h1>${isKo ? '칼럼 &amp; 묵상' : 'Articles &amp; Reflections'}</h1>
                <p>${isKo ? '신앙, 목회, 그리고 그리스도인의 삶에 대한 글.' : 'Thoughts on theology, culture, and Christian life.'}</p>
            </div>
        </section>

        <section style="padding: 4rem 0;">
            <div class="container">
                <div class="article-list">
${items}
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2026 ${isKo ? '최종인 목사' : 'Rev. Choi Jong-in'}. All rights reserved.</p>
        </div>
    </footer>

    <script type="module" src="${js}"></script>
</body>

</html>
`;
}

fs.writeFileSync(path.join(root, 'articles.html'), listPage('en'));
fs.writeFileSync(path.join(koRoot, 'articles.html'), listPage('ko'));

const staticPages = [
  'index.html',
  'books.html',
  'articles.html',
  'about.html'
];

const urlEntries = [];
for (const p of staticPages) {
  urlEntries.push(`  <url>\n    <loc>${SITE_URL}/${p}</loc>\n    <lastmod>${BUILD_DATE}</lastmod>\n    <changefreq>${p === 'articles.html' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${p === 'index.html' ? '1.0' : p === 'about.html' ? '0.8' : '0.9'}</priority>\n  </url>`);
}
for (const a of sorted) {
  const f = pageNameFor(a.id);
  urlEntries.push(`  <url>\n    <loc>${SITE_URL}/${f}</loc>\n    <lastmod>${BUILD_DATE}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
}
for (const p of staticPages) {
  urlEntries.push(`  <url>\n    <loc>${SITE_URL}/ko/${p}</loc>\n    <lastmod>${BUILD_DATE}</lastmod>\n    <changefreq>${p === 'articles.html' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${p === 'index.html' ? '1.0' : p === 'about.html' ? '0.8' : '0.9'}</priority>\n  </url>`);
}
for (const a of sorted) {
  const f = pageNameFor(a.id);
  urlEntries.push(`  <url>\n    <loc>${SITE_URL}/ko/${f}</loc>\n    <lastmod>${BUILD_DATE}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap);

const mapEntries = Object.fromEntries(articles.map((a) => [a.id, pageNameFor(a.id)]));
const loaderPath = path.join(root, 'js', 'article-loader.js');
const loader = fs.readFileSync(loaderPath, 'utf8');
const nextLoader = loader.replace(
  /const articlePathMap = \{[\s\S]*?\};/,
  `const articlePathMap = ${JSON.stringify(mapEntries, null, 4)};`
);
fs.writeFileSync(loaderPath, nextLoader);

console.log(`Generated ${articles.length} EN + ${articles.length} KO article pages.`);

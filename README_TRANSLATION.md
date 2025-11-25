# Translation and Content Guide

This website uses a modular translation system designed to make it easy to add content in Korean first and then translate it to English.

## Structure

The content is separated into modular files in `js/data/`:

*   `js/data/ui.js`: Static UI strings (navigation, buttons, footer).
*   `js/data/books.js`: Book information.
*   `js/data/articles.js`: Article summaries and full content.
*   `js/data/about.js`: Biography and contact info.

## How to Add New Content

### Adding a New Article

1.  Open `js/data/articles.js`.
2.  Add a new object to the `articles` array.
3.  Fill in the `ko` (Korean) section first.
4.  You can leave the `en` (English) section empty or fill it in later.

Example:

```javascript
{
    id: "article4",
    ko: {
        title: "새로운 칼럼 제목",
        excerpt: "칼럼 요약 내용...",
        author: "최종인 목사",
        date: "2025년 1월 1일",
        content: "<p>칼럼 본문 내용...</p>"
    },
    en: {
        title: "", // To be translated
        excerpt: "",
        author: "By Rev. Choi Jong-in",
        date: "January 1, 2025",
        content: ""
    }
}
```

### Adding a New Book

1.  Open `js/data/books.js`.
2.  Add a new object to the `books` array following the existing pattern.

## Translation Automation

A script scaffold is provided in `scripts/translate_content.js`. This script is designed to:
1.  Read the data files.
2.  Identify missing English translations.
3.  (Optional) Connect to a translation API (like Google Translate or DeepL) to automatically fill in the English content.

To use it, you would need to install Node.js and configure an API key.

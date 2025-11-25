# Refactored Translation System

I have restructured the website's translation system to make it modular, efficient, and easy to update, with a focus on a "Korean First" workflow.

## Changes Made

### 1. Modular Data Structure
Instead of a single massive `translations.js` file, the content is now organized into logical modules in the `js/data/` directory:

*   **`js/data/ui.js`**: Contains static UI strings (navigation, buttons, footer).
*   **`js/data/books.js`**: Contains book information (titles, descriptions) in both Korean and English.
*   **`js/data/articles.js`**: Contains article summaries and full content.
*   **`js/data/about.js`**: Contains biography and contact information.

### 2. "Korean First" Workflow
The new data files use a structure that places Korean (`ko`) and English (`en`) content side-by-side. This makes it easy to add a new item in Korean and see exactly where the English translation is needed.

**Example (`js/data/articles.js`):**
```javascript
{
    id: "article1",
    ko: {
        title: "천국에 있는 존재들",
        content: "..."
    },
    en: {
        title: "Beings in Heaven",
        content: "..."
    }
}
```

### 3. Translation Manager
A new file `js/translations-manager.js` aggregates these data files and provides them to the main application in the format it expects. This ensures that no changes were needed to the website's layout or logic.

### 4. ES Modules
The project now uses modern JavaScript ES Modules (`type="module"`), allowing for cleaner code organization and imports.

## How to Update Content

1.  Navigate to `js/data/` and open the relevant file (e.g., `articles.js`).
2.  Add a new entry with your Korean content.
3.  Add the English translation in the corresponding `en` field.

## Verification
I have verified that the website continues to function correctly:
*   Home page loads in English by default.
*   Language toggle switches all content to Korean.
*   Books and Articles pages display correct content in both languages.
*   Full article pages load correctly.

## Automation
I have included a scaffold script `scripts/translate_content.mjs` that demonstrates how you could automate the translation process in the future using an API.

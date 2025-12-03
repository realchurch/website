export const articleService = {
    async loadArticles() {
        console.log('Loading articles...');
        const [part1Module, part2Module] = await Promise.all([
            import('./data/articles-part1.js'),
            import('./data/articles-part2.js')
        ]);
        const articles = [...part1Module.articles, ...part2Module.articles];
        console.log('Articles loaded:', articles.length);
        return articles;
    }
};

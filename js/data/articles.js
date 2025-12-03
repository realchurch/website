import { articles as part1 } from './articles-part1.js';
import { articles as part2 } from './articles-part2.js';

export const articles = [...part1, ...part2];
console.log('Articles aggregated');

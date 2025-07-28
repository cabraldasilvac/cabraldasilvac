const Parser = require('rss-parser');
const fs = require('fs');

const parser = new Parser();

(async () => {
  try {
    const feed = await parser.parseURL('https://medium.com/feed/@wcabraldasilvac');
    const recentPosts = feed.items.slice(0, 5);

    let markdown = '';
    recentPosts.forEach(item => {
      markdown += `- [${item.title}](${item.link})\n`;
    });

    const readmePath = './README.md';
    const readmeContent = fs.readFileSync(readmePath, 'utf-8');

    const updatedReadme = readmeContent.replace(
      /<!-- BLOG-POST-LIST:START -->[\s\S]*?<!-- BLOG-POST-LIST:END -->/,
      `<!-- BLOG-POST-LIST:START -->\n${markdown}<!-- BLOG-POST-LIST:END -->`
    );

    fs.writeFileSync(readmePath, updatedReadme);

    console.log('README atualizado com sucesso com as últimas postagens do blog.');
  } catch (error) {
    console.error('Erro ao buscar ou processar as postagens do blog:', error);
  }

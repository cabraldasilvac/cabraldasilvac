const Parser = require("rss-parser");
const fs = require("fs");

(async () => {
  // --- CONFIGURAÇÃO ---
  const MEDIUM_USERNAME = "wcabraldasilvac";
  const BLOG_POST_LIMIT = 5;
  const README_FILE_PATH = "./README.md";
  // --------------------

  try {
    console.log(
      `Buscando feed RSS de: https://medium.com/feed/@${MEDIUM_USERNAME}`,
    );

    const parser = new Parser();
    const feed = await parser.parseURL(
      `https://medium.com/feed/@${MEDIUM_USERNAME}`,
    );

    let markdownList = feed.items
      .slice(0, BLOG_POST_LIMIT)
      .map((item) => `- [${item.title}](${item.link})`)
      .join("\n");

    console.log("Posts encontrados e formatados:");
    console.log(markdownList);

    const readmeContent = fs.readFileSync(README_FILE_PATH, "utf-8");

    const newReadmeContent = readmeContent.replace(
      /<!-- BLOG-POST-LIST:START -->[\s\S]*?<!-- BLOG-POST-LIST:END -->/,
      `<!-- BLOG-POST-LIST:START -->\n${markdownList}\n<!-- BLOG-POST-LIST:END -->`,
    );

    fs.writeFileSync(README_FILE_PATH, newReadmeContent);
    console.log("Arquivo README.md atualizado com sucesso!");
  } catch (error) {
    console.error("Ocorreu um erro durante a execução do script:", error);
    process.exit(1);
  }
})();

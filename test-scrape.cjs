const cheerio = require('cheerio');
fetch('https://metaveiculos.com.br/?s=RENEGADE').then(res => res.text()).then(html => {
  const $ = cheerio.load(html);
  console.log("A tags with product:", $("a").filter((i, el) => $(el).attr("href") && $(el).attr("href").includes("RENEGADE")).length);
});

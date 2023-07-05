const axios = require('axios'),
  cheerio = require('cheerio');

class WordCountHelper {
  getWordCount(html) {
    const $ = cheerio.load(html);
    const text = $('body').text();
    const sanitizedText = text.replace(/[^\w\s]/g, '').trim();
    const words = sanitizedText.split(/\s+/);
    const wordCount = words.length;
    return wordCount;
  }

  extractLinks(html) {
    const $ = cheerio.load(html);
    const links = [];

    $('a').each((index, element) => {
      const link = $(element).attr('href');
      if (link) {
        links.push(link);
      }
    });

    return links;
  }

  extractImages(html) {
    const $ = cheerio.load(html);
    const images = [];

    $('img').each((index, element) => {
      const src = $(element).attr('src');
      if (src) {
        images.push(src);
      }
    });

    return images;
  }

  async webScraper(url) {
    let result = {};
    await axios(url).then((response) => {
      const html_data = response.data;
      const wordCount = this.getWordCount(html_data);
      const webLinks = this.extractLinks(html_data);
      const webImages = this.extractImages(html_data);
      result = {
        domain: url,
        wordCount: wordCount,
        favourite: false,
        webLinks: webLinks,
        mediaLinks: webImages,
      };
    });
    return result;
  }
}

module.exports = WordCountHelper;

const path = require("path");
const puppeteer = require("puppeteer");
const axios = require("axios");
const { writeFile } = require("./utils");
const config = require("./config");

class Mocky {
  constructor() {
    this.visited = new Map();
  }

  async setup() {
    this.browser = await puppeteer.launch({ headless: config.headless });
    this.page = await this.browser.newPage();
  }

  async main() {
    await this.crawlRecursively([config.baseUrl]);
  }

  async crawlRecursively(hrefs) {
    for (const href of hrefs) {
      await this.page.goto(href);
      // add log file for middleware
      await this.page.addScriptTag({
        url: path.join("/", config.logFilepath),
      });
      // save ssr page
      await this.saveFile(this.page.url(), await this.page.content());
      // save static files
      await this.downloadAndSaveStatic();

      // do mokey tesing
      await this.monkey();

      // crawl recursively
      const nextHrefs = await this.getHrefs();
      await this.crawlRecursively(nextHrefs);
    }
  }

  // FIXME: 現状、monkeyにはしていない
  async monkey() {
    const clickableDoms = await this.page.$$("*", nodes =>
      nodes.filter(node => node.onclick),
    );
    for (const clickableDom of clickableDoms) {
      try {
        await clickableDom.click();
        if (!this.page.url().match(config.baseUrl)) {
          this.page.goBack();
        }
      } catch (e) {} // invisibleなdomをクリックしたときにエラーが起きるので無視する
    }
  }

  async downloadAndSaveStatic() {
    const staticLinks = await this.getStaticLinks();
    for (const staticLink of staticLinks) {
      const { data } = await axios.get(staticLink);
      await this.saveFile(staticLink, data);
    }
  }

  async getStaticLinks() {
    const srcDoms = await this.page.$$("[src]");
    const links = [];
    for (const srcDom of srcDoms) {
      const srcHandler = await srcDom.getProperty("src");
      const src = await srcHandler.jsonValue();
      if (
        !src ||
        !src.match(config.baseUrl) ||
        src.match(config.logFilepath) ||
        this.visited.get(src)
      )
        continue;
      this.visited.set(src, true);
      links.push(src);
    }
    return links;
  }

  async getHrefs() {
    const aTags = await this.page.$$("a[href]");
    const hrefs = [];
    for (const aTag of aTags) {
      const hrefHandler = await aTag.getProperty("href");
      const href = await hrefHandler.jsonValue();
      if (!href || !href.match(config.baseUrl) || this.visited.get(href))
        continue;
      this.visited.set(href, true);
      hrefs.push(href);
    }
    return hrefs;
  }

  async saveFile(url, data) {
    const filename = path.join(
      config.buildDir,
      url
        .replace(config.baseUrl, "")
        .replace(/^\//, "")
        .replace(/\?.+/, "")
        .replace(/#.+/, ""),
      "./index.html",
    );

    console.log("writing - " + url);

    await writeFile(filename, data);
  }

  async close() {
    await this.page.close();
    await this.browser.close();
  }
}

module.exports = Mocky;

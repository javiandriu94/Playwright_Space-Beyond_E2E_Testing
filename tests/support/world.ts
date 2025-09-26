import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({
      headless: true,   
      slowMo: 200       
    });

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // Timeout global para todas las acciones (30s)
    this.page.setDefaultTimeout(30000);
  }

  async cleanup() {
    await this.context.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
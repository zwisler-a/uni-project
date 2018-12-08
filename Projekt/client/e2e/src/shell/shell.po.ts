import { browser } from 'protractor';

export class ShellPage {
  navigateTo() {
    return browser.get('/');
  }
}

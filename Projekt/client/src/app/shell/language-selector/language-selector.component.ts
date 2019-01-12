import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit() {}

  get availableLanguages() {
    return this.translate.langs;
  }

  selectLanguage(language) {
    this.translate.use(language);
  }
  get currentLanguage() {
    return this.translate.currentLang || this.translate.defaultLang;
  }
}

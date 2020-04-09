import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  private themeBaseUrl = 'assets/css/colors';

  settings: Settings = {
    theme: 'default'
  };

  constructor() {
    this.loadSettings();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }

    this.applyTheme(this.settings.theme);
  }

  applyTheme(theme: string) {
    document.getElementById('themeLink').setAttribute('href', `${this.themeBaseUrl}/${theme}.css`);

    this.settings.theme = theme;
  }
}

export interface Settings {
  theme: string;
}

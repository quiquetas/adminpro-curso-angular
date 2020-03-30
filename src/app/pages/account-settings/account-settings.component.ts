import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.setCheck();
  }

  changeTheme(theme: string, link: any) {
    this.checkTheme(link);

    this.settingsService.applyTheme(theme);
    this.settingsService.saveSettings();
  }

  checkTheme(link: any) {
    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  setCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const theme = this.settingsService.settings.theme;

    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }

}

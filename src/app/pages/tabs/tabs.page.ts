import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  selectedTab: any;
  @ViewChild('tabs', { static: false }) tabs: IonTabs;

  isMobile = true;

  constructor(private platform: Platform) {}

  isMobileSize() {
    if (this.platform.width() <= 820) {
      return this.isMobile;
    }
  }

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
  }
}

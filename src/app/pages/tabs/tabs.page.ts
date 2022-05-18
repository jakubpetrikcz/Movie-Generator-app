import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  selectedTab: any;
  @ViewChild('tabs', { static: false }) tabs: IonTabs;

  constructor() {}

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
  }
}

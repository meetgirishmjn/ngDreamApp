import { Component } from '@angular/core';

@Component({
    templateUrl: './main-dashboard.component.html',
     styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent {
  tabs = ['First', 'Second', 'Third'];
  selectedTabIndex = 0;

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selectedTabIndex = this.tabs.length - 1;
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}

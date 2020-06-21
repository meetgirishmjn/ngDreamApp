import { Component } from '@angular/core';

@Component({
    templateUrl: './main-dashboard.component.html',
     styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent {
  tabs = ['REPORT 1', 'REPORT 2'];
  selectedTabIndex = 0;

  addTab(selectAfterAdding: boolean) {

    this.tabs.push('REPORT '+(this.tabs.length+1));

    if (selectAfterAdding) {
      this.selectedTabIndex = this.tabs.length - 1;
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}

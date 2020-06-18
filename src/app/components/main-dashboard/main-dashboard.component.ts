import { Component } from '@angular/core';

@Component({
    templateUrl: './main-dashboard.component.html',
     styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent {
  tabs = ['First', 'Second', 'Third'];
  selectedTabIndex = 0;

  products = [
    { name: "Product B", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-performance.svg' } },
    { name: "Product C", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-stats.svg' } },
    { name: "Product D", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-security.svg' } },
    { name: "Product D", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-security.svg' } }]

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selectedTabIndex = this.tabs.length - 1;
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  addWidget(tabName: string) {
    console.log(tabName);
  }
}

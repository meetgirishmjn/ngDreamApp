import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'report-designer-layout',
  templateUrl: './report-designer.component.html',
  styleUrls: ['./report-designer.component.scss']
})
export class ReportDesignerComponent {

  @Input() reportId: string;
  @Output() onLayoutChange = new EventEmitter<number>();

  //products = [
  //  { name: "Product B", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-performance.svg' } },
  //  { name: "Product C", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-stats.svg' } },
  //  { name: "Product D", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-security.svg' } },
  //  { name: "Product D", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-security.svg' } }]

  addWidget(tabName: string) {
    console.log(tabName);
  }
  onWidgetDrag(p: string) {
    console.log(p);
  }
  onReportCanvasDragover(e: any) {
    console.log(e)
  }
  onReportCanvasDrop(e: any) {
    console.log(e)
  }
}

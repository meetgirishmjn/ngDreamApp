import { Component,OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MetadataService } from '../../../../core/services/metaDataService/metadataService';
import { Subscription } from 'rxjs';
import { WidgetDragArg } from '../../core/models';
import { WidgetInfo } from '../../../../framework-lib';

@Component({
  selector: 'widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.scss']
})
export class WidgetListComponent implements OnInit, OnDestroy {

  @Input() reportId: string;
  @Output() onWidgetDragged = new EventEmitter<WidgetDragArg>();

  widgets: WidgetInfo[] = [];
  subscription: Subscription;

  constructor(private service: MetadataService) {

  }
  ngOnInit(): void {
    this.subscription = this.service.getWidgetList('').subscribe(results => {
      this.widgets = results;
    }, error => {
      console.log(error);
    });
  }

    ngOnDestroy(): void {
      if (this.subscription)
        this.subscription.unsubscribe();
  }
   
  onWidgetDrag(item: WidgetInfo) {
    this.onWidgetDragged.emit({ reportId: 'reportId', widget: item });
  }
}



  //products = [
  //  { name: "Product B", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-performance.svg' } },
  //  { name: "Product C", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-stats.svg' } },
  //  { name: "Product D", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-security.svg' } },
  //  { name: "Product D", description: "some description", picture: { uri: 'https://s2.wp.com/wp-content/themes/a8c/jetpackme-new/images-2018/svg/jetpack-security.svg' } }]

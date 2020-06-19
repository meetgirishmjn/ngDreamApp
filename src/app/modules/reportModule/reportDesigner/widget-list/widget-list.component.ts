import { Component,OnInit, OnDestroy } from '@angular/core';
import { MetadataService } from '../../../../core/services/metaDataService/metadataService';
import { WidgetInfo } from '../../../../core/services/metaDataService/response-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.scss']
})
export class WidgetListComponent implements OnInit, OnDestroy {

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
    this._dragWidget = item;
  }
}

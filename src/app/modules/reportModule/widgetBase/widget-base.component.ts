import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MetadataService } from '../../../core/services/metaDataService/metadataService';
import { WidgetToolBarEventArg } from '../core/models';
import { MatDialog } from '@angular/material/dialog';
import { WidgetInstanceRef } from '../../../framework-lib';
import WidgetModule from '../../../framework-lib/widgetModule';
import { FrameworkService } from '../../../framework-lib/frameworkService';
import WidgetComponentFactory from '../../../framework-lib/widgetComponentFactory';

declare let $;

@Component({
  selector: 'widget-base',
  templateUrl: './widget-base.component.html',
  styles: ['./widget-base.component.scss']
})
export class WidgetBaseComponent implements OnInit, AfterViewInit {

  @Input() widgetRef: WidgetInstanceRef;

  //---
  _size: { width: number, height: number };
  @Input()
  set size(value: { width: number, height: number }) {
    this._size = value;
    //this.onSizeChanged();
  }
  get size(): { width: number, height: number } { return this._size; }
 //--

  @Output() onEvent = new EventEmitter<WidgetToolBarEventArg>();

  @ViewChild('widgetBase', { static: false }) widgetBaseRef: ElementRef;
  @ViewChild('widgetToolBar', { static: false }) widgetToolBarRef: ElementRef;

  widgetPluginInstance: WidgetModule = null;
  isToolBarHover = false;

  constructor(private framework: FrameworkService, private service: MetadataService, private dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    const widgetInfo = this.widgetRef.widget;

    if (!(window as any).WidgetComponentFactory)
      (window as any).WidgetComponentFactory = { registerModule: WidgetComponentFactory.registerModule };

    //dependency files
    this.framework.loadStyles(widgetInfo.styleFiles, () => { });
    const scriptFiles = [widgetInfo.moduleFile, ...widgetInfo.scriptFiles];
    this.framework.loadScripts(scriptFiles, () => {
      try {


        this.widgetPluginInstance = WidgetComponentFactory.createInstance(widgetInfo.id, this.widgetRef.width, this.widgetRef.height, this.widgetBaseRef.nativeElement, this.widgetRef.id);

        if (!(typeof this.widgetPluginInstance.onRender === "function"))
          throw 'Widget instance does not implement onRender function.';

        setTimeout(() => {
          this.widgetPluginInstance.onRender(() => {
            console.log('widgetPluginInstance.onRender');
          });
        },300);
     

      } catch (error) {
        console.log(error);
      }
    });
  }

  onMouseEnter() {
    $(this.widgetToolBarRef.nativeElement).fadeIn(300);
  }

  onMouseLeave() {

    setTimeout(() => {
      if (this.isToolBarHover)
        return;
      $(this.widgetToolBarRef.nativeElement).fadeOut(300);
    }, 100);

  }

  onDeleteWidget(evt) {
    const dialogRef = this.dialog.open(ConfirmDeleteWidgetDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.onEvent.emit({
          eventName: 'toolbar-delete',
          widgetRef: this.widgetRef,
          eventRef: evt
        });
      }
    });
  }

}

@Component({
  templateUrl: 'confirm-delete-dialog.html',
})
export class ConfirmDeleteWidgetDialog {
 
}


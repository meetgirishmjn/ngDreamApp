import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { WidgetDragArg, WidgetInstanceRef } from '../core/models';
import * as $ from 'jquery';
import { FrameworkService } from '../../../core/services/frameworkService';

declare const GridStack: any;

@Component({
  selector: 'report-designer-layout',
  templateUrl: './report-designer.component.html',
  styleUrls: ['./report-designer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportDesignerComponent implements OnInit, OnDestroy, AfterViewInit {
 
  @Input() reportId: string;
  @Output() onLayoutChange = new EventEmitter<number>();

  @ViewChild('divReportCanvas', { static: false }) reportCanvasRef: ElementRef;
  @ViewChildren('gWidget') gWidgetsRef: QueryList<ElementRef>;

  widgetRefs: WidgetInstanceRef[] = [];
  activeWidgetRef: WidgetInstanceRef;
  widgetBeingDrop: WidgetDragArg;
  grid = null;

  constructor(private framework: FrameworkService, private cdRef: ChangeDetectorRef) {
  }
    ngOnDestroy(): void {
      console.log('ngOnDestroy')
    }

  ngOnInit(): void {
    this.reportId = 'rpt_' + this.framework.getUniqueID();

  }
  ngAfterViewInit(): void {
    //setTimeout(() => {
      //this.grid = GridStack.init({}, this.reportCanvasRef.nativeElement);
      //console.log(this.grid);
    //  this.cdRef.detectChanges();
   // })
  }

  getGridstack() {
    let el = $(this.reportCanvasRef.nativeElement);
    let grid = el.data('gridstack');
    if (!grid) {
      el.gridstack({
        animate: true,
        verticalMargin: 5
      });

      grid = el.data('gridstack');
    }

    return grid;
  }


  addWidget(tabName: string) {
    console.log(tabName);
  }
  onWidgetDrag(arg: WidgetDragArg) {
    this.widgetBeingDrop = arg;
  }
  onReportCanvasDragover(ev: any) {
    ev.preventDefault();
  }
  onReportCanvasDrop(ev: any) {
    if (!this.widgetBeingDrop)
      return;

    if (!this.grid) {
      this.grid = GridStack.init({}, this.reportCanvasRef.nativeElement);
      console.log(this.grid);
    }
   
    ev.preventDefault();
    

    const dropEventInfo = {
      clientX: ev.x,
      clientY: ev.y
    };

    const widget = this.widgetBeingDrop.widget;


    const widgetInstance: WidgetInstanceRef = {
      id: 'wdgt_' + widget.id + '_' + this.framework.getUniqueID(),
      width: 250, height: 250,
      gsWidth: widget.size, gsHeight: widget.size,
      isLoading: true, isReady: false, hasError: false, errorMessage: '',
      widget: widget,
      instance: null
    };

    this.activeWidgetRef = widgetInstance;
    this.widgetRefs.push(widgetInstance);
    this.cdRef.detectChanges();

    if (this.activeWidgetRef && this.activeWidgetRef.instance === null) {
      //added new instance
      const gWidgetElement = this.gWidgetsRef.find(o => $(o.nativeElement).hasClass('active'));

      if (gWidgetElement) {
        
        const gsAutoPosition = true;
        const gsWidth = this.activeWidgetRef.gsWidth;
        const gsHeight = this.activeWidgetRef.gsHeight;
        this.grid.addWidget($(gWidgetElement.nativeElement), dropEventInfo.clientX, dropEventInfo.clientY, gsWidth, gsHeight, gsAutoPosition);
        this.cdRef.detectChanges();
     //   this.onWidgetResized(gWidgetElement.nativeElement)
      }
    }

    this.widgetBeingDrop = null;
  }

  onWidgetResized(elem) {
    if (!this.activeWidgetRef)
      return;

    const e = $(elem).find(':first-child');
    let w = e.width();
    let h = e.height();
    w -= Math.ceil(w * 1 / 100);
    h -= Math.ceil(h * 1 / 100);

    this.activeWidgetRef.width = w;
    this.activeWidgetRef.height = h;
  }
 
}

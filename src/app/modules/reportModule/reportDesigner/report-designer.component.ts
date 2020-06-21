import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy, ViewEncapsulation, AfterContentInit, HostListener } from '@angular/core';
import { WidgetDragArg, WidgetToolBarEventArg } from '../core/models';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { WidgetInstanceRef } from '../../../framework-lib';
import { FrameworkService } from '../../../framework-lib/frameworkService';

declare let GridStack;
declare let $;

@Component({
  selector: 'report-designer-layout',
  templateUrl: './report-designer.component.html',
  styleUrls: ['./report-designer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ReportDesignerComponent implements OnInit, OnDestroy, AfterViewInit,AfterContentInit {
 
  @Input() reportId: string;
  @Output() onLayoutChange = new EventEmitter<number>();

  @ViewChild('sidenav', { static: false }) sidenavRef: MatSidenav;
  @ViewChild('divReportCanvas', { static: false }) reportCanvasRef: ElementRef;
  @ViewChildren('gWidget') gWidgetsRef: QueryList<ElementRef>;

  subscription: Subscription;

  widgetRefs: WidgetInstanceRef[] = [];
  activeWidgetRef: WidgetInstanceRef;
  widgetBeingDrop: WidgetDragArg;
  grid = null;
  isAddWidgetClick = false;
  constructor(private framework: FrameworkService, private cdRef: ChangeDetectorRef) {
  }
    ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

  ngOnInit(): void {
    this.reportId = 'rpt_' + this.framework.getUniqueID();

  }
  ngAfterViewInit(): void {
    
  }
  ngAfterContentInit() {
    this.subscription = this.framework.closeSidenavSubject.subscribe(needToCloseSideNave => {
      if (needToCloseSideNave) {
        $('.report-designer').click();
      }
    });
  }


  @HostListener('click', ['$event'])
  documentClick($event) {
      let needToCloseSideNave = true;
      try {
        needToCloseSideNave = !this.matchParent($event.target, "MAT-SIDENAV");
      } catch  {
        console.log('');
      }
      if (needToCloseSideNave && !this.isAddWidgetClick) {
        this.sidenavRef.close();
      }

      this.isAddWidgetClick = false;
  }

  matchParent(parentElement, tabName: string) {
    if (!parentElement)
      return false;

    if (parentElement.tagName.toUpperCase() === tabName)
      return true;

    return this.matchParent(parentElement.parentElement, tabName);
  }

  addWidget() {
    this.isAddWidgetClick = true;
    this.sidenavRef.open();
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
        this.grid = this.getGridstack();
        const gsAutoPosition = true;
        const gsWidth = this.activeWidgetRef.gsWidth;
        const gsHeight = this.activeWidgetRef.gsHeight;
        this.grid.addWidget($(gWidgetElement.nativeElement), dropEventInfo.clientX, dropEventInfo.clientY, gsWidth, gsHeight, gsAutoPosition);
        this.cdRef.detectChanges();
        this.onWidgetResized(gWidgetElement.nativeElement)
      }
    }

    this.widgetBeingDrop = null;
  }

  getGridstack() {
    const el = $(this.reportCanvasRef.nativeElement);
    const grid = el.data('gridstack');
    if (!grid) {
      el.gridstack({
        animate: true,
        verticalMargin: 5,
       // disableResize: true 
      });

      this.grid = el.data('gridstack');
      return this.grid;
    }

    return grid;
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

  onWidgetEvent(arg: WidgetToolBarEventArg) {
    let widget: WidgetInstanceRef = null;
    switch (arg.eventName) {
      case 'toolbar-delete':
          widget = this.widgetRefs.find(o => o.id == arg.widgetRef.id);
        if (widget)
          this.deleteWidget(arg.eventRef, widget);
        break;
    }
  }

  deleteWidget(ev, item: WidgetInstanceRef) {
    event.stopPropagation();


    const el = $(ev.target).closest('.gwidget');
    const grid = this.getGridstack();
    grid.removeWidget(el);

    //if (this.activeWidget.id == item.id)
    this.activeWidgetRef = null;

    this.widgetRefs = this.widgetRefs.filter(o => o.id !== item.id);
  }
}

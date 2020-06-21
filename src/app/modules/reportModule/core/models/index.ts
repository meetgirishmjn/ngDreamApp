import { WidgetInfo, WidgetInstanceRef } from '../../../../framework-lib';

export interface WidgetDragArg {
  reportId: string;
  widget: WidgetInfo;
}

export interface WidgetToolBarEventArg {
  eventName: string;
  widgetRef: WidgetInstanceRef;
  eventRef: any;
}

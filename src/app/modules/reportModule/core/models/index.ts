import { WidgetInfo } from '../../../../core/services/metaDataService/response-models';

export interface WidgetDragArg {
  reportId: string;
  widget: WidgetInfo;
}

export interface WidgetInstanceRef {
  id: string;
  width: number;
  height: number;
  gsWidth: number;
  gsHeight: number;
  isLoading: boolean;
  isReady: boolean;
  hasError: boolean;
  errorMessage: string;
  widget: WidgetInfo;
  instance: WidgetModule;
}

export interface WidgetModule {
  $base: ComponentBaseService;
  onInit(base: ComponentBaseService);
  onDraw(callback: Function);
  onResize();
  onViewModel();
}

export interface ComponentBaseService {
  width: number;
  height: number;
  widgetCode: string;
  element: HTMLElement;
}

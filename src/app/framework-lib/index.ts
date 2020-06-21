import WidgetModule from './widgetModule';

export interface WidgetInfo {
  id: string;
  name: string;
  description: string;
  size: number;
  imageFile: string;
  moduleFile: string;
  styleFiles: string[];
  scriptFiles: string[];
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

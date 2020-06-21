import WidgetModule from './widgetModule';

export default interface ComponentBaseService {
  instanceId: string;
  width: number;
  height: number;
  widgetId: string;
  element: HTMLElement;
  widgetEvents?: PluginEvent[];
  widgetEventListeners?: PluginEventListener[];
  triggerEvent: (instance: WidgetModule, eventName: string, args: any[]) => void;
}

export interface PluginEvent {
  name: string;
  parameters: string[];
}

export interface PluginEventListener {
  name: string;
  parameters: string[];
  callback: Function;
}

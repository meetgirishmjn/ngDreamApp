import WidgetModule from './widgetModule';
import ComponentBaseService from './componentBaseService';

export default class  WidgetComponentFactory {
  static compoenetRegistry = {};

  constructor() {
  }

  static registerModule(widgetId: string, module: WidgetModule) {
    WidgetComponentFactory.compoenetRegistry[widgetId] = module;
  }

  static createInstance(widgetId: string, width: number, height: number, element: HTMLElement, dataset: {}=null): WidgetModule {
    const module = WidgetComponentFactory.compoenetRegistry[widgetId];
    if (!module)
      throw 'Widget module not registered for Widget-id: ' + widgetId;

    const widgetModule = module();
    if (!widgetModule)
      throw 'Widget not defined in module (Widget-id ' + widgetId + ')';

    let newInstance: WidgetModule = null;
    try {
      const $base: ComponentBaseService = {
        element: element,
        height: height,
        width: width,
        widgetId: widgetId,
      }

      newInstance = new widgetModule($base);
    } catch (ex) {
      newInstance = null;
    }

    if (!newInstance)
      throw 'failed to initialize Instance of Widget (Widget-Code: ' + widgetId + ')';

    return newInstance;
  }
}

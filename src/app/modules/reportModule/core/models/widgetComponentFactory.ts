import WidgetModule from './widgetModule';
import ComponentBaseService from './componentBaseService';

export default class  WidgetComponentFactory {
  static componentRegistry = {};
  static plugInInstances: WidgetModule[] = [];

  constructor() {
  }

  static registerModule(widgetId: string, module: WidgetModule) {
    WidgetComponentFactory.componentRegistry[widgetId] = module;
  }

  static createInstance(widgetId: string, width: number, height: number, element: HTMLElement, instanceId:string): WidgetModule {
    const module = WidgetComponentFactory.componentRegistry[widgetId];
    if (!module)
      throw 'Widget module not registered for Widget-id: ' + widgetId;

    const widgetModule = module();
    if (!widgetModule)
      throw 'Widget not defined in module (Widget-id ' + widgetId + ')';

    let newInstance: WidgetModule = null;
    try {
      const $base: ComponentBaseService = {
        instanceId: instanceId,
        element: element,
        height: height,
        width: width,
        widgetId: widgetId,
        triggerEvent: WidgetComponentFactory.plugInEventTriggered
      }

      newInstance = new widgetModule($base);

      WidgetComponentFactory.plugInInstances.push(newInstance);
    } catch (ex) {
      newInstance = null;
    }

    if (!newInstance)
      throw 'failed to initialize Instance of Widget (Widget-Code: ' + widgetId + ')';

    return newInstance;
  }

  static plugInEventTriggered(instance:WidgetModule, eventName:string,args:any[]) {
    const instanceId = instance.$base.instanceId;
    const allInstances = WidgetComponentFactory.plugInInstances.filter(o => o.$base.instanceId !== instanceId);
    allInstances.forEach(o => {
      (o.$base.widgetEventListeners || []).forEach(listner => {
        if (listner.callback) {
          const callback = listner.callback.bind(o);
          callback(args[0]);
        }
      })
    });
  }
}

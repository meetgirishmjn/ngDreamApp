import WidgetModule from '../../../app/framework-lib/widgetModule';
import ComponentBaseService from '../../../app/framework-lib/componentBaseService';

export default class DimpleJSWidget implements WidgetModule {
  $base: ComponentBaseService;

  onInit(base: ComponentBaseService) {
    this.$base = base;
  }

  onResize() {
    console.log('on resize');
  }

  onRender(callback: Function) {
    console.log('on render');
    if (callback) {
      callback();
    }
  }
}

(window as any).WidgetComponentFactory.registerModule('DimpleJS'/*$$WCOM_UID*/, DimpleJSWidget);

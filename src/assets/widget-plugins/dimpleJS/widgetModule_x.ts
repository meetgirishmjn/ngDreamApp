import WidgetModule from '../../../app/modules/reportModule/core/models/widgetModule';
import ComponentBaseService from '../../../app/modules/reportModule/core/models/componentBaseService';

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

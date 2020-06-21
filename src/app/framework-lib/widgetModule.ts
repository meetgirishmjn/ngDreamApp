import ComponentBaseService from './componentBaseService';

export default interface WidgetModule {
  $base: ComponentBaseService;
  onInit(base: ComponentBaseService);
  onRender(callback: Function);
  onResize();
}

import { Component, HostListener } from '@angular/core';
import { FrameworkService } from './framework-lib/frameworkService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  constructor(private framework: FrameworkService) {

  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.framework.closeSidenavSubject.next(true);
  }
}

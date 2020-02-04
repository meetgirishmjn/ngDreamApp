import { Component } from '@angular/core';
import { onSideNavChange, animateText, onMainContentChange } from './MainSideMenu.animation';

@Component({
    selector: 'main-side-menu',
    templateUrl: './mainSideMenu.component.html',
    styleUrls: ['./mainSideMenu.component.scss'],
    animations: [onSideNavChange, animateText, onMainContentChange]
})
export class MainSideMenuComponent {
    showSecondoryBar = false;
    isSideMenuOpen: boolean = false;

    onSinenavToggle() {
        this.isSideMenuOpen = !this.isSideMenuOpen

        setTimeout(() => {
          //  this.linkText = this.sideNavState;
        }, 200)
     //   this._sidenavService.sideNavState$.next(this.sideNavState)
    }
    
}

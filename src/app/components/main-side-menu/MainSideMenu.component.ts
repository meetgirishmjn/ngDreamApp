import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText, onMainContentChange, listAnimation } from './MainSideMenu.animation';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'main-side-menu',
    templateUrl: './mainSideMenu.component.html',
    styleUrls: ['./mainSideMenu.component.scss'],
    animations: [onSideNavChange, animateText, onMainContentChange, listAnimation,
            trigger('indicatorRotate', [
                state('collapsed', style({ transform: 'rotate(0deg)' })),
                state('expanded', style({ transform: 'rotate(180deg)' })),
                transition('expanded <=> collapsed',
                    animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
                ),
            ])
        ]
})
export class MainSideMenuComponent implements OnInit {
    
    showSecondoryBar = false;
    isSideMenuOpen = false;
    menuItems: IMenuItem[] = [];

    ngOnInit(): void {
        let items: IMenuItem[] = [];
        
        this.menuItems = items;
    }

    onItemSelected(item: IMenuItem) {
        if (!item.children || !item.children.length) {
        }
        if (item.children && item.children.length) {
            item.expanded = !item.expanded;
        }
    }

    onSinenavToggle() {
        this.isSideMenuOpen = !this.isSideMenuOpen

        setTimeout(() => {
          //  this.linkText = this.sideNavState;
        }, 200)
     //   this._sidenavService.sideNavState$.next(this.sideNavState)
    }
    
}

interface IMenuItem {
    id: number;
    name: string;
    icon: string;
    isActive: boolean;
    expanded: boolean;
    children?: IMenuItem[];
}

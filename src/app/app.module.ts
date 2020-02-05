import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MainHeaderComponent } from './components/main-header/mainHeader.component';
import { MainSideMenuComponent } from './components/main-side-menu/MainSideMenu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { LayoutComponent } from './components/layouts/layout.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
        AppComponent, LayoutComponent, MainDashboardComponent,
        MainHeaderComponent, MainSideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      BrowserAnimationsModule, MatRippleModule,
      FlexLayoutModule,
      MatButtonModule,
      MatToolbarModule, MatMenuModule, MatBadgeModule,
      MatIconModule, MatSidenavModule, MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

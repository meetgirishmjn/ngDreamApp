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
import { MainHeaderComponent } from './modules/appModule/components/main-header/mainHeader.component';
import { MainSideMenuComponent } from './modules/appModule/components/main-side-menu/MainSideMenu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MainDashboardComponent } from './modules/appModule/components/main-dashboard/main-dashboard.component';
import { LayoutComponent } from './modules/appModule/components/layouts/layout.component';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ReportDesignerComponent } from './modules/reportModule/reportDesigner/report-designer.component';
import { WidgetListComponent } from './modules/reportModule/reportDesigner/widget-list/widget-list.component';
import { HttpClientModule } from '@angular/common/http';
import { WidgetBaseComponent, ConfirmDeleteWidgetDialog } from './modules/reportModule/widgetBase/widget-base.component';

@NgModule({
  declarations: [
        AppComponent, LayoutComponent, MainDashboardComponent,
    MainHeaderComponent, MainSideMenuComponent,
    ReportDesignerComponent, WidgetListComponent,
    WidgetBaseComponent, ConfirmDeleteWidgetDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, MatRippleModule, MatTabsModule, MatGridListModule, MatCardModule,
      FlexLayoutModule,
      MatButtonModule,
      MatToolbarModule, MatMenuModule, MatBadgeModule,
    MatIconModule, MatSidenavModule, MatListModule,
    MatDialogModule
  ],
  entryComponents: [ConfirmDeleteWidgetDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

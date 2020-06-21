import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './modules/appModule/components/layouts/layout.component';
import { MainDashboardComponent } from './modules/appModule/components/main-dashboard/main-dashboard.component';


const routes: Routes = [
    {
        path: 'app', component: LayoutComponent,
        children: [
            { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: MainDashboardComponent },
           // { path: 'myProfile', component: MyProfileComponent },
        ]
    },
    { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

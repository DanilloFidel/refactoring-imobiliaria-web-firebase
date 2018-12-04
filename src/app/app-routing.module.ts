import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousesAreaComponent } from './houses-area/houses-area.component';
import { LandingAreaComponent } from './landing-area/landing-area.component';


const routes: Routes = [
  { path: '', component: LandingAreaComponent },
  { path: 'imoveis', component: HousesAreaComponent },
  { path: 'area-do-usuario', loadChildren: './user-area/user-area.module#UserAreaModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

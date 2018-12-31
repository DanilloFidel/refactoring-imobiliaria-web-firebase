import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousesAreaComponent } from './houses-area/houses-area.component';
import { LandingAreaComponent } from './landing-area/landing-area.component';
import { AutenticationAreaComponent } from './autentication-area/autentication-area.component';
import { UserManagementComponent } from './user-management/user-management.component';


const routes: Routes = [
  { path: '', component: LandingAreaComponent },
  { path: 'imoveis', component: HousesAreaComponent },
  { path: 'area-de-autenticacao', component: AutenticationAreaComponent },
  { path: 'auth/resetar-senha', component: UserManagementComponent },
  { path: 'area-do-usuario', loadChildren: './user-area/user-area.module#UserAreaModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

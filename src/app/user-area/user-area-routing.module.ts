import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserAreaComponent } from "./user-area.component";

const routes: Routes = [
  { path: '', component: UserAreaComponent, //canActivate: [ AutenticationService ],
    children: [
      //{ path: 'favoritos', component: FavoritesComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAreaRoutingModule { }

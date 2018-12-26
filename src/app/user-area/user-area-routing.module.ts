import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserAreaComponent } from "./user-area.component";
import { AuthenticationService } from "../_services/authentication.service";

const routes: Routes = [
  { path: '', component: UserAreaComponent, canActivate: [ AuthenticationService],
  children: [

]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAreaRoutingModule { }

import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserAreaComponent } from "./user-area.component";
import { AuthenticationService } from "../_services/authentication.service";
import { FavoritesComponent } from "./favorites/favorites.component";
import { ConfigPanelComponent } from "./config-panel/config-panel.component";
import { EmployeePanelComponent } from "./employee-panel/employee-panel.component";
import { HousesPanelComponent } from "./houses-panel/houses-panel.component";

const routes: Routes = [
  {
    path: '', component: UserAreaComponent, canActivate: [AuthenticationService],
    children: [
      { path: 'favoritos', component: FavoritesComponent },
      { path: 'configuracoes', component: ConfigPanelComponent },
      { path: 'gerenciar-usuarios', component: EmployeePanelComponent },
      { path: 'imoveis', component: HousesPanelComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAreaRoutingModule { }

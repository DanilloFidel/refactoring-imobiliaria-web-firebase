import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserAreaComponent } from "./user-area.component";
import { UserAreaRoutingModule } from "./user-area-routing.module";
import { FavoritesComponent } from './favorites/favorites.component';
import { ConfigPanelComponent } from './config-panel/config-panel.component';
import { HousesPanelComponent } from './houses-panel/houses-panel.component';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { FormsComponent } from './forms/forms.component';


@NgModule({
  declarations: [
  UserAreaComponent,
  FavoritesComponent,
  ConfigPanelComponent,
  HousesPanelComponent,
  EmployeePanelComponent,
  FormsComponent
  ],
  imports: [
    CommonModule,
    UserAreaRoutingModule
  ],
})
export class UserAreaModule{

}

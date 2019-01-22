import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserAreaComponent } from "./user-area.component";
import { UserAreaRoutingModule } from "./user-area-routing.module";
import { FavoritesComponent } from './favorites/favorites.component';
import { ConfigPanelComponent } from './config-panel/config-panel.component';
import { HousesPanelComponent } from './houses-panel/houses-panel.component';
import { EmployeePanelComponent } from './employee-panel/employee-panel.component';
import { FormsComponent } from './forms/forms.component';
import { MaterialItensModule } from "../_material-itens/material-components.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchHouseComponent } from './dashboard/search-house/search-house.component';
import { SearchEmployeeComponent } from './dashboard/search-employee/search-employee.component';
import { SearchDataComponent } from './dashboard/search-data/search-data.component';
import { SearchCustomerComponent } from './dashboard/search-customer/search-customer.component';


@NgModule({
  declarations: [
  UserAreaComponent,
  FavoritesComponent,
  ConfigPanelComponent,
  HousesPanelComponent,
  EmployeePanelComponent,
  FormsComponent,
  DashboardComponent,
  SearchHouseComponent,
  SearchEmployeeComponent,
  SearchDataComponent,
  SearchCustomerComponent
  ],
  imports: [
    CommonModule,
    UserAreaRoutingModule,
    MaterialItensModule
  ],
})
export class UserAreaModule{

}

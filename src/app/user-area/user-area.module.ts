import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserAreaComponent } from "./user-area.component";
import { UserAreaRoutingModule } from "./user-area-routing.module";

@NgModule({
  declarations: [
  UserAreaComponent
  ],
  imports: [
    CommonModule,
    UserAreaRoutingModule
  ],
})
export class UserAreaModule{

}

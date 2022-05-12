import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import {
  DeleteAllComponent,
  DeleteUserComponent,
  FilterUserComponent,
  NewUserComponent,
  UpdateUserComponent,
  UserListComponent,
  IndexUsersComponent
} from '@app-home';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

@NgModule({
  exports: [
    HomeRoutingModule,
    MaterialModule
  ],
  declarations: [
    DeleteAllComponent,
    DeleteUserComponent,
    FilterUserComponent,
    NewUserComponent,
    UpdateUserComponent,
    UserListComponent,
    IndexUsersComponent
  ],
  imports: [
    HomeRoutingModule,
    MaterialModule

  ]
})
export class HomeModule { }

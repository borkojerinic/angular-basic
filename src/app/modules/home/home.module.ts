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
import { TranslateModule } from '@ngx-translate/core';
import { CustomDatePipe } from 'src/app/core/pipes/custom-date.pipe';

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
    IndexUsersComponent,
    CustomDatePipe
  ],
  imports: [
    HomeRoutingModule,
    MaterialModule,
    TranslateModule
  ]
})
export class HomeModule { }

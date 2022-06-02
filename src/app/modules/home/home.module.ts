import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import {
  FilterUserComponent,
  UserListComponent,
  IndexUsersComponent,
  DeleteAllComponent,
  DeleteUserComponent,
  NewUserComponent,
  UpdateUserComponent
} from '@app-home';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CustomMediumDateFormatPipe } from '@app-pipes';

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
    CustomMediumDateFormatPipe
  ],
  imports: [
    HomeRoutingModule,
    MaterialModule,
    TranslateModule
  ]
})
export class HomeModule { }

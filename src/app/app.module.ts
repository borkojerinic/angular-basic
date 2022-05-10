import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserListComponent } from './users/user-list.component';
import { MatTableModule } from '@angular/material/table';
import { FilterUserComponent } from './users/filter-user.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { IndexUsersComponent } from './users/index-users/index-users.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UpdateUserComponent } from './users/update-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteUserComponent } from './users/delete-user.component';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { NewUserComponent } from './users/new-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteAllComponent } from './users/delete-all.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderInterceptor } from './users/loader.interceptor';
import { SpinnerService } from './users/spinner.service';
import { LoaderComponent } from './users/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    FilterUserComponent,
    IndexUsersComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    NewUserComponent,
    DeleteAllComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

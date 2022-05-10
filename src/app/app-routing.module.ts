import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexUsersComponent } from './users/index-users/index-users.component';

const routes: Routes = [
  {
    path: '', component: IndexUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

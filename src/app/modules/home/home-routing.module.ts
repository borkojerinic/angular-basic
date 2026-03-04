import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteName } from '@app-enums';
import { IndexUsersComponent, NewUserComponent } from '@app-home';

const routes: Routes = [
  {
    path: RouteName.default,
    component: IndexUsersComponent,
  },
  {
    path: RouteName.new,
    component: NewUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

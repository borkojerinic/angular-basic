import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home.module';
import { IndexUsersComponent } from './pages/index-users/index-users.component';

const routes: Routes = [
  {
    path: '', component: IndexUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

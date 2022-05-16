import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from 'src/app/core/guards/home.guard';
import { HomeModule } from './home.module';
import { IndexUsersComponent } from './pages/index-users/index-users.component';

const routes: Routes = [
  {
    path: 'home', component: IndexUsersComponent, canActivate: [HomeGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

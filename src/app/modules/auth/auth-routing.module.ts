import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteName } from '@app-enums';
import { LoginComponent } from '@app-auth';
import { UserAuthorizedGuard } from '@app-guards';

const routes: Routes = [
  {
    path: RouteName.login,
    component: LoginComponent,
    canActivate: [UserAuthorizedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

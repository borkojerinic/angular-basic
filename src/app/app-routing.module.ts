import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteName } from '@app-enums';
import { UserNotAuthorizedGuard } from './core/guards';

const routes: Routes = [
  {
    path: RouteName.home,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [UserNotAuthorizedGuard]
  },
  {
    path: RouteName.default, redirectTo: RouteName.home, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

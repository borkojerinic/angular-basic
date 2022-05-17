import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@app-services';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private storageService: LocalStorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }

  /**
   * This method go to login page if user is logged
   * 
   * @param url 
   * 
   * @returns url or boolean
   */
  public checkLogin(url: string): any {

    let storageLoggedIn: any = this.storageService.getItem('isUserLoggedIn');
    if (url === "/login") {
      if (storageLoggedIn === 'true') {
        return this.router.parseUrl('/home');
      } else {
        return true;
      }
    } else {
      if (storageLoggedIn === 'true') {
        return true
      } else {
        return this.router.parseUrl('/login');
      }
    }
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '@app-services';
import { RouteName } from '@app-enums';

@Injectable({
    providedIn: 'root'
})
export class UserAuthorizedGuard implements CanActivate {

    constructor(private storageService: StorageService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkLogin();
    }

    /**
     * If user is logged in guard does not allow to go back on login page.
     * 
     * @returns UrlTree or boolean
     */
    public checkLogin(): UrlTree | boolean {
        let storageLoggedIn: boolean = this.storageService.getItem('isUserLoggedIn');

        if (storageLoggedIn === true) {
            return this.router.parseUrl(`/${RouteName.home}`);
        }
        return true;
    }
} 

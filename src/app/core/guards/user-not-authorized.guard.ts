import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '@app-services';
import { RouteName } from '@app-enums';

@Injectable({
    providedIn: 'root'
})
export class UserNotAuthorizedGuard implements CanActivate {
    constructor(private storageService: StorageService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkHome();
    }

    /**
    * If user is not logged in guard does not allow to go on any page.
    * 
    * @returns UrlTree or boolean
    */
    public checkHome(): UrlTree | boolean {
        let storageLoggedIn: boolean = this.storageService.getItem('isUserLoggedIn');

        if (storageLoggedIn === true) {
            return true;
        }
        return this.router.parseUrl(`/${RouteName.login}`);
    }
} 

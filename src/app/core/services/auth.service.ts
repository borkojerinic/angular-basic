import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //#region Class properties

  public isLogged: boolean = false;
  public rememberMe: boolean = false;

  //#endregion

  constructor(private storageService: LocalStorageService) { }

  //#region Class functionality

  /**
   * 
   * This method check email and password and set item on local storage
   * 
   * @param email string
   * @param password string
   * 
   * @returns  Using observables to pass values
   */
  public login(email: string, password: string, check: boolean): Observable<boolean> {
    this.rememberMe = check;
    this.isLogged = email === 'admin' && password === 'admin';

    this.storageService.useLocalStorage(check);
    this.storageService.setItem('isUserLoggedIn', this.isLogged ? 'true' : 'false');

    return of(this.isLogged).pipe(
      delay(1000),
      tap(val => {
        console.log('Is User Authentication is successful: ' + val);
      })
    );
  }

  /**
   * 
   * This method set logged user to false and remove item from local storage
   * 
   * @returns void
   */

  public logout(): void {
    this.isLogged = false;
    this.storageService.removeItem('isUserLoggedIn');
  }

  //#endregion

}

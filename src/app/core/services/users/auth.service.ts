import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { LoginRequest } from '@app-models';
import { StorageService } from '@app-services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //#region Angular stuff (@Output)

  @Output() isUserAuthenticated: EventEmitter<boolean> = new EventEmitter();

  //#endregion

  //#region Class properties

  public isLogged: boolean = false;
  public rememberMe: boolean = false;

  //#endregion

  constructor(private storageService: StorageService) { }

  //#region Class functionality

  /**
   * This method check email and password and set item in storage
   * If logged method emit user authentication
   * 
   * @param loginFormValue LoginRequest
   * 
   * @returns  Using observables to pass values
   */
  public login(loginFormValue: LoginRequest): Observable<boolean> {
    this.rememberMe = loginFormValue.check;
    this.isLogged = loginFormValue.userEmail === 'admin' && loginFormValue.password === 'admin';

    this.storageService.useLocalStorage(loginFormValue.check);
    if (this.isLogged) {
      this.isUserAuthenticated.emit(true);
      this.storageService.setItem('isUserLoggedIn', this.isLogged);
    }

    return of(this.isLogged)
      .pipe(
        tap(val => {
          console.log('Is User Authentication is successful: ' + val);
        })
      );
  }

  /**
   * This method set logged user to false, remove item from storage and emit user authentication
   * 
   * @returns void
   */
  public logout(): void {
    this.isLogged = false;
    this.storageService.removeItem('isUserLoggedIn');
    this.isUserAuthenticated.emit(false);

  }

  //#endregion
}

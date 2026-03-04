import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, StorageService } from '@app-services';
import { RouteName } from '@app-enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //#region Class properties

  public userIsAuthenticated = false;
  public languages: string[] = ['en', 'de'];
  public language: string = 'en';

  //#endregion

  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.translate.use(this.language);
    this.authService.isUserAuthenticated
      .subscribe(isLogged => this.userIsAuthenticated = isLogged);
  }

  //#region Life cycle hooks

  public ngOnInit(): void {
    this.userIsAuthenticated = this.storage.getItem('isUserLoggedIn');
  }

  //#endregion

  //#region Class functionality

  public logout() {
    this.authService.logout();
    this.router.navigate([`${RouteName.login}`]);
  }

  public changeLanguage(): void {
    this.translate.use(this.language);
  }

  //#endregion
}

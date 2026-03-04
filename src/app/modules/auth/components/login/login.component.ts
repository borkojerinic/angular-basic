import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, FormsService } from '@app-services';
import { filter } from 'rxjs';
import { LoginRequest } from '@app-models';
import { RouteName } from '@app-enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  //#region Class properties

  public loginForm: FormGroup;

  //#endregion

  constructor(
    private authService: AuthService,
    private router: Router,
    private formsService: FormsService
  ) { }

  //#region Life cycle hooks

  ngOnInit(): void {
    this.loginForm = this.formsService.getLoginForm();
  }

  //#endregion

  //#region UI response

  /**
   * Save value from remember me checkbox
   * 
   * @returns void
   */
  public onRememberMeClick(): void {
    const currentValue = this.loginForm.get('check')?.value;
    this.loginForm.patchValue({
      check: currentValue
    });
  }

  /**
   * This method check userEmail and password and log in on home page
   * 
   * @param loginFormValue Login form values
   * 
   * @returns void
   */
  onClickSubmit(loginFormValue: LoginRequest): void {
    this.authService.login(
      loginFormValue
    )
      .pipe(filter(x => !!x))
      .subscribe(() => {
        this.router.navigate([`/${RouteName.home}`]);
      });
  }

  //#endregion
}

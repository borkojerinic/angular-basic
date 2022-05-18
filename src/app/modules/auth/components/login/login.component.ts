import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, FormsService } from '@app-services';
import { filter } from 'rxjs';
import { LoginRequest } from 'src/app/shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  //#region Class properties

  public loginForm: FormGroup = {} as FormGroup;

  //#endregion

  constructor(
    private authService: AuthService,
    private router: Router,
    private formsService: FormsService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formsService.getLoginForm();
  }

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

  //#region UI response

  /**
   * This method check userEmail and password and log in on home page
   * 
   * @param loginFormValue Login form values
   * 
   * @returns void
   */
  onClickSubmit(loginFormValue: LoginRequest): void {
    this.authService.login(
      loginFormValue.userEmail,
      loginFormValue.password,
      loginFormValue.check)
      .pipe(filter(x => !!x))
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  //#endregion
}

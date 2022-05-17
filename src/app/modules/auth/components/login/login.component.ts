import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //#region Class properties

  public userEmail: string = '';
  public password: string = '';
  public loginForm: FormGroup;
  public check: boolean = false;

  //#endregion

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      check: new FormControl(false)
    });
  }

  ngOnInit() {
  }

  /**
   * 
   * Save value from remember me check box
   * 
   * @returns void
   */
  public onRememberMeClick(): void {
    this.check = !this.check;
  }

  //#region UI response

  /**
   * 
   * This method check userEmail and password and log in on home page
   * 
   * @param data Login form values
   * 
   * @returns void
   */
  onClickSubmit(data: any): void {
    this.userEmail = data.userEmail;
    this.password = data.password;

    console.log("Login page email: " + this.userEmail);
    console.log("Login page password: " + this.password);

    this.authService.login(this.userEmail, this.password, this.check)
      .subscribe(isLoggedSuccess => {
        console.log("Is Login Success: " + isLoggedSuccess);

        if (isLoggedSuccess) {
          this.router.navigate(['/home']);
        }
      });
  }

  //#endregion
}

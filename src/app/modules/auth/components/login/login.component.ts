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

  //#endregion

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  //#region UI response

  /**
   * 
   * This method check userEmail and password and log in on home page
   * 
   * @param data Login form values
   */
  onClickSubmit(data: any) {
    this.userEmail = data.userEmail;
    this.password = data.password;

    console.log("Login page email: " + this.userEmail);
    console.log("Login page password: " + this.password);

    this.authService.login(this.userEmail, this.password)
      .subscribe(data => {
        console.log("Is Login Success: " + data);

        if (data) {
          this.router.navigate(['/home']);
        }
      });
  }

  //#endregion
}

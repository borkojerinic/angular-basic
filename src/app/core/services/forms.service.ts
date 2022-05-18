import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  /**
   * This method returns an empty Login form.
   * 
   * @returns FormGroup
   */
  public getLoginForm(): FormGroup {
    return new FormGroup({
      userEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      check: new FormControl(false)
    });
  }

  /**
   * This method will return an empty NewUser form.
   * 
   * @returns FormGroup
   */
  public getNewUserForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  /**
   * This method returns an empty UpdateUser form.
   * 
   * @param user User
   * 
   * @returns FormGroup
   */
  public getUpdateUserForm(user: User): FormGroup {
    return new FormGroup({
      id: new FormControl(user.id),
      name: new FormControl(user.name, [Validators.required]),
      email: new FormControl(user.email, [Validators.required, Validators.email])
    });
  }
}

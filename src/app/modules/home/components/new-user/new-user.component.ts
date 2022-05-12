import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService, SnackBarService } from '@app-services';
import { IUser } from '@app-models';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  //#region Class properties

  public formAddNewUser: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  //#endregion

  constructor(
    public dialogRef: MatDialogRef<NewUserComponent>,
    private service: UserService,
    private snackBarService: SnackBarService
  ) { }

  //#region Life cycle hooks

  /**
   * 
   * On init of this component, it's necessary to init current date information.
   * 
   * @returns void
   */

  public ngOnInit(): void {

  }

  //#endregion

  //#region UI response

  /**
   * 
   * This method close opened dialog.
   * 
   * @returns void
   */
  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  /**
   * 
   * Add new user and show snack bar message.
   * 
   * @returns void
   */
  public onSave(): void {
    this.service.addUser(this.formAddNewUser.value as IUser)
      .subscribe((response) => {
        this.dialogRef.close(true);
        this.snackBarService.showSnackBarMessage('Successfully added', 'Ok');
      });
  }

  //#endregion
}

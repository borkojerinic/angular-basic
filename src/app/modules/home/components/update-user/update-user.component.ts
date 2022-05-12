import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService, SnackBarService } from '@app-services';
import { IUser } from '@app-models';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  //#region Class properties

  public updateForm: FormGroup;

  //#endregion

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    private service: UserService,
    private snackBarService: SnackBarService
  ) {
    this.updateForm = new FormGroup({
      id: new FormControl(this.data.id),
      name: new FormControl(this.data.name, [Validators.required]),
      email: new FormControl(this.data.email, [Validators.required, Validators.email])
    });
  }

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
   * Close opened dialog
   * 
   * @returns void
   */
  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  /**
   * 
   * Update user and show snack bar message.
   * 
   * @returns void
   */
  public onSave(): void {
    this.service.updateUser(this.updateForm.value as IUser)
      .subscribe(() => {
        this.dialogRef.close(true);
        this.snackBarService.showSnackBarMessage('Updated', 'Ok');
      });
  }

  //#endregion
}

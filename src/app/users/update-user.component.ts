import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from './user';
import { UserService } from './user.service';

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
    private snackBar: MatSnackBar
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
    console.log("");
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
   * Update user
   * 
   * @returns void
   */
  public onSave(): void {
    this.service.updateUser(this.updateForm.value as IUser)
      .subscribe(() => {
        this.dialogRef.close(true);
        this.openSnackBar('Updated', 'Ok');
      },
        (error) => {
          this.openSnackBar('The email has already been taken.', 'Ok');
        }
      );
  }

  //#endregion

  //#region Utilities

  /**
   * 
   * This method will display the message given in the snackbar on the bottom of the screen.
   * 
   * @param message string - Message to be displayed inside the snack bar.
   * @param action string - Close button text.
   * 
   * @returns void
   */
  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action);
  }

  //#endregion

}

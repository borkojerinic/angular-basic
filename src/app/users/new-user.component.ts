import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from './user';
import { UserService } from './user.service';

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
    private snackBar: MatSnackBar
  ) { }

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
   * This method close opened dialog.
   * 
   * @returns void
   */
  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  /**
   * 
   * Add new user
   * 
   * @returns void
   */
  public onSave(): void {
    this.service.addUser(this.formAddNewUser.value as IUser)
      .subscribe((response) => {
        this.dialogRef.close(true);
        this.openSnackBar('Successfully added', 'Ok');
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

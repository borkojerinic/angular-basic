import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    private service: UserService,
    private snackBar: MatSnackBar
  ) { }

  //#region Life cycle hooks

  /**
   * 
   * On init of this component, it's necessary to init current date information.
   * 
   * @returns void
   * 
   */

  public ngOnInit(): void {
    console.log("");
  }

  //#endregion

  //#region UI responses

  /**
   * This method close delete user dialog
   * 
   * @returns void
   */
  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  /**
   * Delete user on button click
   * 
   * @returns void
   */
  public onDelete() {
    this.service.deleteUser(this.data)
      .subscribe(() => {
        this.dialogRef.close(true);
        this.openSnackBar('Deleted', 'Ok');
      });
  }

  //#endregion

  //#region Utilities

  /**
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

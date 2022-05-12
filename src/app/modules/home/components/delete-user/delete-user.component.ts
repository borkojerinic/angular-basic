import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService, UserService } from '@app-services';
import { IUser } from '@app-models';

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
    private snackBarService: SnackBarService
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
   * Delete user on button click and show snack bar message.
   * 
   * @returns void
   */
  public onDelete() {
    this.service.deleteUser(this.data)
      .subscribe(() => {
        this.dialogRef.close(true);
        this.snackBarService.showSnackBarMessage('Deleted', 'Ok');
      });
  }

  //#endregion
}

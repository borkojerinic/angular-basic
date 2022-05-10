import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { IUser } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.scss']
})
export class DeleteAllComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteAllComponent>,
    private service: UserService,
    private snackBar: MatSnackBar
  ) { }

  //#region Life cycle hooks

  /**
   * On init of this component, it's necessary to init current date information.
   * 
   * @returns void
   */

  public ngOnInit(): void {
    console.log("");
  }

  //#endregion

  //#region  UI Responses

  /**
   * This method closes opened dialog.
   * 
   * @returns void
   */
  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  /**
   * Deletes multiple users that are selected for deletion.
   * 
   * @returns void
   */
  public onDelete(): void {
    forkJoin(this.data.selected.map((x: IUser) => this.service.deleteUser(x)))
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
   * 
   * @param action string - Close button text.
   * 
   * @returns void
   */
  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action);
  }

  //#endregion
}

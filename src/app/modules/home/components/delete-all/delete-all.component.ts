import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { UserService, SnackBarService } from '@app-services';
import { IUser } from '@app-models';

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
    private snackBarService: SnackBarService
  ) { }

  //#region Life cycle hooks

  /**
   * On init of this component, it's necessary to init current date information.
   * 
   * @returns void
   */

  public ngOnInit(): void {

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
   * Deletes multiple users that are selected for deletion, and show snack bar message.
   * 
   * @returns void
   */
  public onDelete(): void {
    forkJoin(this.data.selected.map((x: IUser) => this.service.deleteUser(x)))
      .subscribe(() => {
        this.dialogRef.close(true);
        this.snackBarService.showSnackBarMessage('Deleted', 'Ok');
      });
  }

  //#endregion
}

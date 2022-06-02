import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { UserService, SnackBarService } from '@app-services';
import { User } from '@app-models';
import { MessageType } from '@app-enums';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styleUrls: ['./delete-all.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteAllComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteAllComponent>,
    private service: UserService,
    private snackBarService: SnackBarService,
    private translateService: TranslateService
  ) { }

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
    forkJoin(this.data.selected.map((x: User) => this.service.deleteUser(x)))
      .subscribe(() => {
        this.dialogRef.close(true);
        this.snackBarService.showSnackBarMessage(this.translateService.instant('Home.DeleteAllDeleted'), MessageType.success);
      });
  }

  //#endregion
}

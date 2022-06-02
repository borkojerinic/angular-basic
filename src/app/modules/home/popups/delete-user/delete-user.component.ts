import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService, UserService } from '@app-services';
import { User } from '@app-models';
import { MessageType } from '@app-enums';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteUserComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    private service: UserService,
    private snackBarService: SnackBarService,
    private translateService: TranslateService
  ) { }

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
        this.snackBarService.showSnackBarMessage(
          this.translateService.instant('Home.UserDeleted'),
          MessageType.success);
      });
  }

  //#endregion
}

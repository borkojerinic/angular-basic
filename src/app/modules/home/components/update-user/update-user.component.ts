import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService, SnackBarService, FormsService } from '@app-services';
import { User } from '@app-models';
import { TranslateService } from '@ngx-translate/core';
import { MessageType } from 'src/app/shared/enums/message-type';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUserComponent implements OnInit {

  //#region Class properties

  public updateForm: FormGroup = {} as FormGroup;

  //#endregion

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    private service: UserService,
    private snackBarService: SnackBarService,
    private translateService: TranslateService,
    private formsService: FormsService
  ) { }

  //#region LifeCycle

  ngOnInit(): void {
    this.updateForm = this.formsService.getUpdateUserForm(this.data);
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
    this.service.updateUser(this.updateForm.value as User)
      .subscribe(() => {
        this.dialogRef.close(true);
        this.snackBarService.showSnackBarMessage(
          this.translateService.instant('Home.UserUpdated'),
          'Ok', MessageType.success, 5000
        );
      });
  }

  //#endregion
}

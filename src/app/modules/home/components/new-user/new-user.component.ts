import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService, SnackBarService, FormsService } from '@app-services';
import { User } from '@app-models';
import { MessageType } from 'src/app/shared/enums/message-type';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserComponent implements OnInit {

  //#region Class properties

  public formAddNewUser: FormGroup = {} as FormGroup;

  //#endregion

  constructor(
    private dialogRef: MatDialogRef<NewUserComponent>,
    private service: UserService,
    private snackBarService: SnackBarService,
    private formsService: FormsService
  ) { }

  // #region LifeCycle

  ngOnInit(): void {
    this.formAddNewUser = this.formsService.getNewUserForm();
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
   * Add new user and show snack bar message.
   * 
   * @returns void
   */
  public onSave(): void {
    this.service.addUser(this.formAddNewUser.value as User)
      .subscribe(() => {
        this.dialogRef.close(true);
        this.snackBarService.showSnackBarMessage('Successfully added', 'Ok', MessageType.success, 5000);
      });
  }

  //#endregion
}

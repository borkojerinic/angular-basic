import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService, SnackBarService, FormsService, StorageService } from '@app-services';
import { Router } from '@angular/router';
import { RouteName, MessageType } from '@app-enums';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserComponent implements OnInit {

  //#region Class properties

  public formAddNewUser: FormGroup;

  //#endregion

  constructor(
    private service: UserService,
    private snackBarService: SnackBarService,
    private formsService: FormsService,
    private router: Router,
    private storage: StorageService
  ) { }

  // #region LifeCycle

  ngOnInit(): void {
    this.formAddNewUser = this.formsService.getNewUserForm();
    this.storage.loadOrNavigateBack = 1;
  }

  //#endregion

  //#region UI response

  /**
   * This method close opened dialog.
   * 
   * @returns void
   */
  public onBack(): void {
    this.router.navigate([`/${RouteName.home}`]);
  }

  /**
   * Add new user and show snack bar message.
   * 
   * @returns void
   */
  public onSave(): void {
    this.service.addUser(this.formAddNewUser.value)
      .subscribe(() => {
        this.snackBarService.showSnackBarMessage(
          'Successfully added',
          MessageType.success, 5000);
        this.router.navigate([`/${RouteName.home}`]);
      });
  }

  //#endregion
}

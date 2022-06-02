import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter, first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { QueryParams, User } from '@app-models';
import { StorageService, UserService } from '@app-services';
import { Router } from '@angular/router';
import { DeleteAllComponent, DeleteUserComponent, UpdateUserComponent } from '@app-home';
import { RouteName } from '@app-enums';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnChanges {

  //#region Angular stuff (@ViewChild, @Input)

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() searchString: string = '';

  //#endregion

  //#region Class properties

  public displayedColumns: string[] = ['check', 'id', 'name', 'email', 'created', 'action'];
  public dataSource: MatTableDataSource<User> = new MatTableDataSource();
  public pageSizeOptions = [2, 5, 7, 10, 100];
  public allUsersLength = 0;
  public showFirstLastButtons = true;
  public disableDeleteAllButton = true;
  private selectedUsers: User[] = [];
  public numOfChecked = 0;

  public queryParams: QueryParams = {
    page: 0,
    pageSize: 10,
    search: '',
    order: '',
    direction: ''
  }

  //#endregion

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private storage: StorageService
  ) { }

  //#region Life cycle hooks

  /**
   * This method on init set state of selected users, number of selected users and disableDeleteAllButton
   * 
   * @returns void
   */
  public ngOnInit(): void {
    this.selectedUsers = this.storage.selectedUsers;
    this.numOfChecked = this.selectedUsers.length;
    this.disableDeleteAllButton = (this.selectedUsers.length === 0) ? true : false;
  }

  /**
   * This method load state and handle the changes 
   * 
   * @returns void
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('searchString')) {
      this.setState();
    }
  }

  //#endregion

  //#region Functionality

  /**
   * This method set state for query params on load or change detection
   * Does not send requests for more then one blank spaces.
   * 
   * @returns void
   */
  private setState(): void {
    //does not send a request if there is more then one blank space
    if (this.queryParams.search !== this.searchString.replace(/\s+/g, ' ') || this.queryParams.search === '') {
      this.queryParams.page = 0;
      this.queryParams = this.storage.queryParams ? this.storage.queryParams : this.queryParams;

      //search on load
      if (this.storage.loadOrNavigateBack === 0) {
        this.getUsers();
      } else {
        //search on navigate back
        if (this.queryParams.direction !== '') {
          this.sort.sort({ id: `${this.queryParams.order}`, start: `${this.queryParams.direction}`, disableClear: false });
          this.storage.loadOrNavigateBack = 0;
        } else {
          this.getUsers();
          this.storage.loadOrNavigateBack = 0;
        }
      }
    }
  }

  /**
   * Get users from service, set checked, dataSource and pagination properties
   * 
   * @returns void
   */
  private getUsers(): void {
    this.queryParams.search = this.searchString.replace(/\s+/g, ' ');
    this.userService.getUsers(this.queryParams)
      .pipe(first())
      .subscribe((users) => {
        for (let userData of users.data) {
          userData.checked = this.selectedUsers.find(sel => sel.id === userData.id) !== undefined;
        }

        this.dataSource.data = users.data;
        this.allUsersLength = users.meta.total;
        this.queryParams.pageSize = users.meta.per_page;
      });
  }

  /**
   * Method change page size or navigates to another page when clicked
   * 
   * @param event Change event object that is emitted when the user selects a different page size or navigates to another page.
   * 
   * @returns void
   */
  public handlePageEvent(event: PageEvent): void {
    this.allUsersLength = event.length;
    this.queryParams.pageSize = event.pageSize;
    this.queryParams.page = event.pageIndex;
    this.getUsers();
  }

  /**
   * Get user from service for update
   * 
   * @param id number- user id for update
   * 
   * @returns void
   */
  public getUserForUpdate(id: number): void {
    this.userService.getUser(id)
      .pipe(first())
      .subscribe((user) => {
        this.openUpdateDialog(id, user.data.name, user.data.email);
      });
  }

  /**
   * Open dialog for user update, refresh page after close
   * 
   * @param userId number - user id for update
   * @param userName string - user name for update
   * @param userEmail string - user email for update
   * 
   * @returns void 
   */
  public openUpdateDialog(userId: number, userName: string, userEmail: string): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, { data: { id: userId, name: userName, email: userEmail } });

    dialogRef.afterClosed()
      .pipe(filter(x => !!x))
      .subscribe((x) => {
        const index = this.selectedUsers.findIndex(newItem => newItem.id === userId);
        if (index !== -1) {
          this.selectedUsers[index].name = x.name;
          this.selectedUsers[index].email = x.email;
        }
        this.getUsers();
      });
  }

  /**
   * Open dialog for delete, refresh page after close
   * 
   * @param userId number - user id for delete
   * @param userName string - user name for delete
   * @param userEmail string - user email for delete
   * 
   * @returns void
   */
  public openDeleteDialog(userId: number, userName: string, userEmail: string): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, { data: { id: userId, name: userName, email: userEmail } });

    dialogRef.afterClosed()
      .pipe(filter(x => !!x))
      .subscribe(() => {
        const index = this.selectedUsers.findIndex(newItem => newItem.id === userId);
        if (index !== -1) {
          this.selectedUsers.splice(index, 1);
          this.numOfChecked--;
        }
        this.getUsers();
      });
  }

  /**
   * This method navigate to add new user component.
   */
  public openAddNewDialog(): void {
    this.storage.queryParams = this.queryParams;
    this.router.navigate([`${RouteName.home}/${RouteName.new}`]);
  }

  /**
   * Sort users on header click
   * 
   * @param sort Sort - active (true, false) and direction (asc, desc)
   * 
   * @returns void
   */
  public sortData(sort: Sort): void {
    this.queryParams.direction = sort.direction;
    this.queryParams.order = sort.active;
    if (!sort.active || sort.direction === '') {
      this.queryParams.order = '';
    }
    this.getUsers();
  }

  /**
   * Open dialog for delete all checked users, after close refresh page
   * 
   * @returns void
   */
  public openDeleteAllDialog(): void {
    this.disableDeleteAllButton = false;
    const dialogRef = this.dialog.open(DeleteAllComponent, { data: { selected: this.selectedUsers } });

    dialogRef.afterClosed()
      .pipe(filter(x => !!x))
      .subscribe(() => {
        this.disableDeleteAllButton = true;
        this.numOfChecked = 0;
        this.selectedUsers = [];
        this.storage.selectedUsers = [];
        this.getUsers();
      });
  }

  /**
   * Make array of checked users and set disable property for Delete All button
   * 
   * @param user IUser - checked user
   * @param event checked (true, false)
   * 
   * @returns void
   */
  public getUserFromCheckbox(user: User, event: any): void {
    const index = this.selectedUsers.findIndex(x => x.id === user.id);
    if (index === -1 && event.checked) {
      user.checked = event.checked;
      this.selectedUsers.push(user);
    } else if (index !== -1 && !event.checked) {
      user.checked = event.checked;
      this.selectedUsers.splice(index, 1);
    }
    this.disableDeleteAllButton = (this.selectedUsers.length === 0) ? true : false;
    this.numOfChecked = this.selectedUsers.length;
    this.storage.selectedUsers = this.selectedUsers;
  }

  //#endregion
}

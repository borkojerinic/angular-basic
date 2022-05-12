import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter, first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { IUser } from '@app-models';
import { UserService } from '@app-services';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { NewUserComponent } from '../new-user/new-user.component';
import { DeleteAllComponent } from '../delete-all/delete-all.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {

  //#region Angular stuff (@ViewChild, @Output)

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Input() listOfUsers: string = '';

  //#endregion

  //#region Class properties

  public displayedColumns: string[] = ['check', 'id', 'name', 'email', 'created', 'action'];
  public dataSource: MatTableDataSource<IUser> = new MatTableDataSource();
  public pageSizeOptions = [2, 5, 7, 10, 100];
  public length = 0;
  public pageSize = 10;
  public showFirstLastButtons = true;
  public pageIndex = 0;
  public lastSearch: string = '';
  public disableDeleteAllButton = true;
  public orderBy = '';
  public direction = '';
  private selectedUsers: IUser[] = [];
  public numOfChecked = 0;

  //#endregion

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  //#region Life cycle hooks

  /**
   * 
   * This method handle the changes 
   * 
   * @returns void
   */
  public ngOnChanges(): void {
    if (this.lastSearch !== this.listOfUsers) {
      if (this.listOfUsers === '') {
        this.listOfUsers = '';
      }
      this.lastSearch = this.listOfUsers;
      this.pageIndex = 0;
      this.getUsers();
    }
  }

  /**
   * 
   * This method on init load users and set pagination.
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.getUsers();
    this.dataSource.paginator = this.paginator;
  }

  //#endregion

  //#region Functionality

  /**
   * 
   * Get users from service, set checked, dataSource and pagination properties
   * 
   * @returns void
   */
  private getUsers(): void {
    this.userService.getUsers(this.pageSize, this.pageIndex, this.listOfUsers, this.orderBy, this.direction)
      .pipe(first())
      .subscribe((users) => {
        for (let x of users.data) {
          x.checked = this.selectedUsers.find(sel => sel.id === x.id) != undefined;
        }
        this.dataSource.data = users.data;
        this.length = users.meta.total;
        this.pageSize = users.meta.per_page;
      });
  }

  /**
   * 
   * Method change page size or navigates to another page when clicked
   * 
   * 
   * @param event Change event object that is emitted when the user selects a different page size or navigates to another page.
   * 
   * @returns void
   */
  public handlePageEvent(event: PageEvent): void {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getUsers();
  }

  /**
   * 
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
   * 
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
      .subscribe(() => {
        this.getUsers();
      });
  }

  /**
   * 
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(this.selectedUsers)
        const index = this.selectedUsers.findIndex(newItem => newItem.id === userId);
        if (index !== -1) {
          this.selectedUsers.splice(index, 1);
        }
        this.getUsers();
      }
    });
  }

  /**
   * 
   * Open dialog to add new user, after close refresh page
   * 
   * @returns void
   */
  public openAddNewDialog(): void {
    const dialogRef = this.dialog.open(NewUserComponent, { data: { name: '', email: '' } });

    dialogRef.afterClosed()
      .pipe(filter(x => !!x))
      .subscribe(() => {
        this.getUsers();
      });
  }

  /**
   * 
   * Sort users on header click
   * 
   * @param sort Sort - active (true, false) and direction (asc, desc)
   * 
   * @returns void
   */
  public sortData(sort: Sort): void {
    this.direction = sort.direction;
    this.orderBy = sort.active;
    if (!sort.active || sort.direction === '') {
      this.direction = '';
      this.orderBy = '';
    }
    this.getUsers();
  }

  /**
   * 
   * Open dialog for delete all checked users, after close refresh page
   * 
   * @returns void
   */
  public openDeleteAllDialog(): void {
    this.disableDeleteAllButton = true;
    const dialogRef = this.dialog.open(DeleteAllComponent, { data: { selected: this.selectedUsers } });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.numOfChecked = 0;
          this.selectedUsers = [];
          this.getUsers();
        }
      });
  }

  /**
   * 
   * Make array of checked users and set disable property for Delete All button
   * 
   * @param item IUser - checked user
   * @param event checked (true, false)
   * 
   * @returns void
   */
  public getUserFromCheckbox(item: IUser, event: any): void {
    const index = this.selectedUsers.findIndex(newItem => newItem.id === item.id);
    if (event.checked) {
      if (index === -1) {
        item.checked = event.checked;
        this.selectedUsers.push(item);
      }
    } else {
      if (index !== -1) {
        item.checked = event.checked;
        this.selectedUsers.splice(index, 1);
      }
    }

    if (this.selectedUsers.length === 0) {
      this.disableDeleteAllButton = true;
    } else {
      this.disableDeleteAllButton = false;
    }

    this.numOfChecked = this.selectedUsers.length;
  }

  //#endregion
}

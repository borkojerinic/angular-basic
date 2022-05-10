import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter, first, forkJoin } from 'rxjs';
import { IUser } from './user';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from './update-user.component';
import { DeleteUserComponent } from './delete-user.component';
import { Sort } from '@angular/material/sort';
import { NewUserComponent } from './new-user.component';
import { DeleteAllComponent } from './delete-all.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {

  @Input() listOfUsers: string = '';

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

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.lastSearch !== this.listOfUsers) {
      if (this.listOfUsers === '') {
        this.listOfUsers = '';
      }
      this.lastSearch = this.listOfUsers;
      this.pageIndex = 0;
      this.getUsers();
    }
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getUsers();
    this.dataSource.paginator = this.paginator;
  }

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

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getUsers();
  }

  getUserForUpdate(id: number) {
    this.userService.getUser(id)
      .pipe(first())
      .subscribe((user) => {
        this.openUpdateDialog(id, user.data.name, user.data.email);
      });
  }

  openUpdateDialog(userId: number, userName: string, userEmail: string): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, { data: { id: userId, name: userName, email: userEmail } });

    dialogRef.afterClosed()
      .pipe(filter(x => !!x))
      .subscribe(() => {
        this.getUsers();
      });
  }

  openDeleteDialog(userId: number, userName: string, userEmail: string) {
    const dialogRef = this.dialog.open(DeleteUserComponent, { data: { id: userId, name: userName, email: userEmail } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.selectedUsers.findIndex(newItem => newItem.id === userId);
        this.selectedUsers.splice(index, 1);
        this.getUsers();
      }
    });
  }

  openAddNewDialog() {
    const dialogRef = this.dialog.open(NewUserComponent, { data: { name: '', email: '' } });
    dialogRef.afterClosed()
      .pipe(filter(x => !!x))
      .subscribe(() => {
        this.getUsers();
      });
  }

  sortData(sort: Sort) {
    this.direction = sort.direction;
    this.orderBy = sort.active;
    if (!sort.active || sort.direction === '') {
      this.direction = '';
      this.orderBy = '';
    }
    this.getUsers();
  }

  // deleteAllChecked() {
  //   this.disableDeleteAllButton = true;
  //   forkJoin(this.selectedUsers.map(x => this.userService.deleteUser(x)))
  //     .subscribe(() => {
  //       this.selectedUsers = [];
  //       this.getUsers();
  //     });
  // }

  openDeleteAllDialog() {
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

  public getUserFromCheckbox(item: IUser, event: any) {
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
}

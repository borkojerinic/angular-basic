import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss']
})
export class FilterUserComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  public searchData: string = '';
  public dataSource: MatTableDataSource<IUser> = new MatTableDataSource();
  public pageSize = 10;
  public pageIndex = 0;

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  filterUsers() {
    this.search.emit(this.searchData);
  }

  clearSearch() {
    this.searchData = '';
    this.search.emit(this.searchData);
  }
}

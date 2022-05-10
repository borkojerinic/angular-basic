import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from './user';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss']
})
export class FilterUserComponent implements OnInit {

  //#region Angular stuff (@Output)

  /**
   * 
   * @param search string - Emit string to parent component
   * 
   */

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  //#endregion

  //#region Class properties

  public searchData: string = '';

  //#endregion

  constructor() { }

  //#region Life cycle hooks

  /**
   * 
   * On init of this component, it's necessary to init current date information.
   * 
   * @returns void
   */
  public ngOnInit(): void {
    console.log("");
  }

  //#endregion

  //#region UI response

  /**
   * 
   * This method emit string from input to parent component
   * 
   * @returns void
   */

  public filterUsers(): void {
    this.search.emit(this.searchData);
  }

  /**
   * 
   * This method clear input on user click and emit string to parent component
   * 
   * @returns void
   */

  public clearSearch(): void {
    this.searchData = '';
    this.search.emit(this.searchData);
  }

  //#endregion
}

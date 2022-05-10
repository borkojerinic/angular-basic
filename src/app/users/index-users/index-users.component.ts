import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser, SingleUser } from '../user';

@Component({
  selector: 'app-index-users',
  templateUrl: './index-users.component.html',
  styleUrls: ['./index-users.component.scss']
})
export class IndexUsersComponent implements OnInit {

  //#region Angular stuff (@Output)

  /**
   * Output for filter search
   */

  @Output() sendUserList = new EventEmitter<SingleUser>();

  //#endregion

  //#region Class properties

  public filterUsers: string = '';

  //#endregion

  constructor() { }

  //#region Life cycle hooks

  /**
   * 
   * On init of this component, it's necessary to init current date information.
   * 
   */

  ngOnInit(): void {
    console.log("");
  }

  //#endregion

  //#region UI response

  /**
   * This method set filterUsers on key up
   * 
   * @param message string from FilterUserComponent
   * 
   * @returns void
   */

  public onKeyUp(message: string): void {
    this.filterUsers = message;
  }

  //#endregion
}

import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { SingleUser } from '@app-models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-index-users',
  templateUrl: './index-users.component.html',
  styleUrls: ['./index-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexUsersComponent {

  //#region Angular stuff (@Output)

  /**
   * Output for filter search
   */

  @Output() sendUserList = new EventEmitter<SingleUser>();

  //#endregion

  //#region Class properties

  public filterUsers$ = new BehaviorSubject<string>('');

  //#endregion

  constructor() { }

  //#region UI response

  /**
   * This method set filterUsers on key up
   * 
   * @param message string from FilterUserComponent
   * 
   * @returns void
   */

  public onKeyUp(message: string): void {    
    this.filterUsers$.next(message);    
  }

  //#endregion
}

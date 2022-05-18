import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterUserComponent {

  //#region Angular stuff (@Output)

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  //#endregion

  //#region Class properties

  public searchData: string = '';

  //#endregion

  constructor() { }

  //#region UI response

  /**
   * This method emit string from input to parent component
   * 
   * @returns void
   */

  public filterUsers(): void {
    this.search.emit(this.searchData);
  }

  /**
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

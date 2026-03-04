import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from '@app-services';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterUserComponent implements OnInit {

  //#region Angular stuff (@Output)

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  //#endregion

  //#region Class properties

  public searchData: string = '';

  //#endregion

  constructor(private storage: StorageService) {
    if (this.storage.queryParams !== undefined) {
      this.searchData = this.storage.queryParams.search;
    }
  }

  ngOnInit(): void {
    this.search.emit(this.searchData);
  }

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

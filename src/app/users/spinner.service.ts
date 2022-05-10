import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  //#region Class properties

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  //#endregion

  constructor() {
  }

  //#region Functionality

  /**
   * 
   * This method show loading spinner
   * 
   * @returns void
   */
  public show(): void {
    this.isLoading$.next(true);
  }

  /**
   * 
   * This method hide loading spinner
   * 
   * @returns void
   */
  public hide(): void {
    this.isLoading$.next(false);
  }

  //#endregion
}

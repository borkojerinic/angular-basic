import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  //#region Class properties

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public requestCounter: number = 0;

  //#endregion

  constructor() {
  }

  //#region Functionality

  /**
   * This method show loading spinner
   * 
   * @returns void
   */
  public show(): void {
    if (this.requestCounter === 0) {
      this.isLoading$.next(true);
    }
    this.requestCounter++;
  }

  /**
   * This method hide loading spinner
   * 
   * @returns void
   */
  public hide(): void {
    this.requestCounter--;
    if (this.requestCounter === 0) {
      this.isLoading$.next(false);
    }
  }

  //#endregion
}

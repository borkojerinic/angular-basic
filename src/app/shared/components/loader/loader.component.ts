import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from '@app-services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  //#region Class properties

  public color: string = 'warn';
  public isLoading$: BehaviorSubject<boolean> = this.spinnerService.isLoading$;

  //#endregion

  constructor(private spinnerService: SpinnerService) {
  }

  //#region Life cycle hooks

  /**
   * 
   * On init of this component, it's necessary to init current date information.
   * 
   * @returns void
   */

  ngOnInit(): void {

  }

  //#endregion

}

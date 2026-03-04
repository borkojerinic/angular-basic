import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from '@app-services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

  //#region Class properties

  public color: string = 'warn';
  public isLoading$: BehaviorSubject<boolean> = this.spinnerService.isLoading$;

  //#endregion

  constructor(private spinnerService: SpinnerService) {
  }

}

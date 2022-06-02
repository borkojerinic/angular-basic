import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'crudAngular';

  constructor(private translate: TranslateService) {
    // this.setTranslateConfig();
  }

  public setTranslateConfig(): void {
    this.translate.use('de');
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MessageType } from '@app-enums';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(
        private snackBar: MatSnackBar,
        private translateService: TranslateService
    ) { }

    //#region 

    /**
     * This method will display the message given in the snackbar on the bottom of the screen.
     * 
     * @param message string - Message to be displayed inside the snack bar.
     * @param action string - Close button text.
     * 
     * @returns void
     */
    public showSnackBarMessage(message: string, mode: MessageType, duration: number = 5000, action: string = this.translateService.instant('Home.UpdateClose')): void {
        const config = new MatSnackBarConfig();
        config.panelClass = [mode + '-notification'];
        config.duration = duration;
        this.snackBar.open(message, action, config);
    }

    //#endregion
}

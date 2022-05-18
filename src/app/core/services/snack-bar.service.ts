import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MessageType } from 'src/app/shared/enums/message-type';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    //#region 

    /**
     * 
     * This method will display the message given in the snackbar on the bottom of the screen.
     * 
     * @param message string - Message to be displayed inside the snack bar.
     * @param action string - Close button text.
     */

    public showSnackBarMessage(message: string, action: string, mode: MessageType, duration: number): void {
        const config = new MatSnackBarConfig();
        config.panelClass = [mode + '-notification'];
        config.duration = duration;
        this.snackBar.open(message, action, config);
    }

    //#endregion
}
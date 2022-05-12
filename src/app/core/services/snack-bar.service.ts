import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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

    public showSnackBarMessage(message: string, action: string): void {
        this.snackBar.open(message, action);
    }

    //#endregion
}
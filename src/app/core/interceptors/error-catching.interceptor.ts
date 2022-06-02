import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackBarService } from '@app-services';
import { MessageType } from '@app-enums';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor(private snackBarService: SnackBarService) {
    }

    //#region Utilities

    /**
     * Identifies and handles a given HTTP request. 
     * 
     * @param request The outgoing request object to handle.
     * @param next The next interceptor in the chain, or the backend if no interceptors remain in the chain.
     * 
     * @returns Observable<HttpEvent<unknown>> - An observable of the event stream. 
     */
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMsg = `Error: ${error.error.message}`;
                    } else {
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    this.snackBarService.showSnackBarMessage(
                        error.error.errors.email[0],
                        MessageType.error,
                        5000,
                        "Try Again");
                    return throwError(() => {
                        return errorMsg;
                    });
                })
            )
    }

    //#endregion
}

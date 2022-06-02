import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { SpinnerService } from "@app-services";

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

    constructor(public spinnerService: SpinnerService) { }

    //#region Utilities

    /**
     * 
     * Identifies and handles a given HTTP request. 
     * 
     * @param req The outgoing request object to handle.
     * @param next The next interceptor in the chain, or the backend if no interceptors remain in the chain.
     * 
     * @returns Observable<HttpEvent<unknown>> - An observable of the event stream. 
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.spinnerService.show();
        return next.handle(req)
            .pipe(
                finalize(() => {
                    this.spinnerService.hide();
                })
            );
    }

    //#endregion
}

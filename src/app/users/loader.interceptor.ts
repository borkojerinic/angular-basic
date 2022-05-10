import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { SpinnerService } from "./spinner.service";

@Injectable({
    providedIn: 'root'
})

export class LoaderInterceptor implements HttpInterceptor {
    public counter = 0;
    constructor(public spinnerService: SpinnerService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.show();
        this.counter++;
        return next.handle(req)
            .pipe(
                finalize(() => {
                    this.counter--;
                    if (this.counter === 0) {
                        this.spinnerService.hide();
                    }
                })
            );
    }
}
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
 
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
 
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `client-Error: ${error.error.message}`;
                    } else {
                        errorMessage = `server-Error:  ${error.error.message}`;
                        switch (error.status) {
                            case 400:
                                errorMessage =error.error
                                break;
                            case 401:
                                errorMessage =error.error
                                break;
                            case 500:
                                    errorMessage =error.error
                                 break;
                            case 3:
                                    errorMessage =error.error
                                 break;
 
                        }
                    }                  
                    return throwError(errorMessage);
                })
            )
    }
}
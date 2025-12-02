import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BaseHttpInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add common headers, authorization logic, etc. here
    let token = localStorage.getItem('token');
    let modifiedRequest: any;
    if (!!token) {
      modifiedRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token).set('X-TenantID', 'queberry')
      });
    }
    else {
      modifiedRequest = request.clone({
        headers: request.headers.set('X-TenantID', 'queberry')
      }); 
    }

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log full error details for debugging
        console.error('HTTP Error:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          message: error.message,
          error: error.error
        });
        // Preserve the original error object so components can access error.status
        return throwError(() => error);
      })
    );
  }
}


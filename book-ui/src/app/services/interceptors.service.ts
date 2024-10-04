import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepting request');
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }

}

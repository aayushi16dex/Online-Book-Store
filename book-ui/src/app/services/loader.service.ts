import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false);
  loaderState$ = this.loaderSubject.asObservable();
  constructor() { }
  show() {
      this.loaderSubject.next(true);
  }


  hide() {
    this.loaderSubject.next(false);
  }
}

import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-page-not-found',
  template: ` <ng-lottie [options]="options" /> `,
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {
  options: AnimationOptions = {
    path: '/assets/lottie/404.json',
  };
}

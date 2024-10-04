import { Component } from '@angular/core';
import { stat } from 'fs';
import { LoaderService } from '../services/loader.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrl: './loader.component.scss',
})
export class LoaderComponent {
    loading: boolean = false;
    options: AnimationOptions = {
        path: '/assets/lottie/loader.json',
    };
    constructor(private loaderService: LoaderService) {}
    ngOnInit() {
        console.log('from loader');

        this.loaderService.loaderState$.subscribe((state) => {
            console.log(state, 'state');
            this.loading = state;
        });
    }
}

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
        this.loaderService.loaderState$.subscribe((state) => {
            this.loading = state;
        });
    }
}

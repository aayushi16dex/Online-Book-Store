import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http' /* add this */
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StartupService } from './services/startup.service';
import { LoaderService } from './services/loader.service';
import { HttpInterceptorService } from './services/interceptors.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './loader/loader.component';
import { LottieComponent, provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BooksModule } from './books/books.module';


// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
export function initializeApp(startupService: StartupService) {
  return (): Promise<any> => {
    return startupService.initialize();
  };
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatPaginatorModule,
    LottieComponent,    
    // FontAwesomeModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [StartupService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    MatSnackBar,
    provideLottieOptions({
      player: () => player,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

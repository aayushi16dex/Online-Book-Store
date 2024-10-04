import { NgModule } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrendingBooksComponent } from './trending-books/trending-books.component';
import { LoaderService } from './services/loader.service';
import { filter } from 'rxjs';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

  {path: '' , redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent},
  { path: 'trending', component: TrendingBooksComponent },

  /* Lazy loading - loaded only when requested */
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'book', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private loadingService:LoaderService, private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError)
      )
      .subscribe(event => {
        // if (event instanceof NavigationStart) {
        //   this.loadingService.show();
        // } else {
        //   this.loadingService.hide();
        // }
      });
  }
 }

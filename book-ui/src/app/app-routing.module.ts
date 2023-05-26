import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrendingBooksComponent } from './trending-books/trending-books.component';

const routes: Routes = [

  {path: '' , redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent},
  { path: 'trending', component: TrendingBooksComponent },

  /* Lazy loading - loaded only when requested */
  { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'book', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

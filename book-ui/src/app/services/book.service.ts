import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class BookService {
    constructor(private httpClient: HttpClient, private sb: MatSnackBar) {}

    //methods to communicate with back-end APIs
    getBooks(body: any, callback: (data: any) => void): void {
        let url = environment.BOOK_BASE_URL + environment.BOOK.GET_ALL_BOOKS;
        // this.loaderService.show();
        this.httpClient.post(url, body).subscribe(
            (resp: any) => {
                callback(resp);
            },
            (error) => {
                this.sb.open('Please try again !', '', {
                    duration: environment.SNACKBAR_TIMEOUT,
                });
                // Optionally handle error
            }
        );
    }
    getTrendingBooks() {
        let url =
            environment.BOOK_BASE_URL + environment.BOOK.GET_TRENDING_BOOKS;
        console.log('API call: ', url);
        return this.httpClient.get(url);
    }
    viewBook(id: string) {
        let url = environment.BOOK_BASE_URL + environment.BOOK.GET_BOOK + id;
        console.log('API call: ', url);
        return this.httpClient.get(url);
    }

    addBook(body: any) {
        let url = environment.BOOK_BASE_URL + environment.BOOK.ADD_BOOK;
        console.log('API call: ', url);
        console.log('ServiceBody', body);
        return this.httpClient.post(url, body);
    }

    updateBook(body: any) {
        let url = environment.BOOK_BASE_URL + environment.BOOK.UPDATE_BOOK;
        console.log('API call: ', url);
        console.log('ServiceBody', body);
        return this.httpClient.put(url, body);
    }

    deleteBook(id: string) {
        let url = environment.BOOK_BASE_URL + environment.BOOK.DELETE_BOOK + id;
        console.log('API call: ', url);
        return this.httpClient.delete(url);
    }

    searchBook(id: string) {
        let url = environment.BOOK_BASE_URL + environment.BOOK.SEARCH_BOOK + id;
        console.log('API call: ', url);
        return this.httpClient.get(url);
    }
}

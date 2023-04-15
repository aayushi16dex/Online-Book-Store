import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment.dev'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  //methods to communicate with back-end APIs

  getBooks(){
    let url = environment.BOOK_BASE_URL + environment.BOOK.GET_ALL_BOOKS
    console.log("API call: ", url);
    return this.httpClient.get(url); 
  }
  getTrendingBooks(){
    let url = environment.BOOK_BASE_URL + environment.BOOK.GET_TRENDING_BOOKS
    console.log("API call: ", url);
    return this.httpClient.get(url);
  }
  viewBook(id: string){
    let url = environment.BOOK_BASE_URL + environment.BOOK.GET_BOOK + id;
    console.log("API call: ", url);
    return this.httpClient.get(url);
  }

  addBook(body: any){
    let url = environment.BOOK_BASE_URL + environment.BOOK.ADD_BOOK;
    console.log("API call: ", url);
    console.log("ServiceBody", body)
    return this.httpClient.post(url,body);
  }

  updateBook(body: any){
    let url = environment.BOOK_BASE_URL + environment.BOOK.UPDATE_BOOK ;
    console.log("API call: ", url);
    console.log("ServiceBody", body)
    return this.httpClient.put(url,body);
  }

  deleteBook(id: string){
    let url = environment.BOOK_BASE_URL + environment.BOOK.DELETE_BOOK + id;
    console.log("API call: ", url);
    return this.httpClient.delete(url);
  }

  searchBook(id: string){
    let url = environment.BOOK_BASE_URL + environment.BOOK.SEARCH_BOOK + id;
    console.log("API call: ", url);
    return this.httpClient.get(url);
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  constructor(private http:HttpClient) {}

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Simulate an async operation, e.g., fetching config
      try{
        this.http.get('assets/property-settings.json').subscribe((data:any)=>{
          if(data){
            environment.BASE_URL = data.BASE_URL
            environment.BOOK_BASE_URL = data.BOOK_BASE_URL
            environment.CART_BASE_URL = data.CART_BASE_URL
            environment.USER_BASE_URL = data.USER_BASE_URL
              console.log('Startup tasks completed.',data);
              resolve(true);
          }
        })
      }
      catch{
        
      }
     
     
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpClient: HttpClient) {}

    addUser(body: any) {
        let url = environment.USER_BASE_URL + environment.USER.ADD_USER;

        console.log('API call: ', url);
        console.log('Service Body', body);
        return this.httpClient.post(url, body);
    }

    login(body: any) {
        let url = environment.USER_BASE_URL + environment.USER.LOGIN;
        console.log('API call: ', url);
        return this.httpClient.post(url, body);
    }
}

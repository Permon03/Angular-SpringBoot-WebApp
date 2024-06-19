import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient : HttpClient) { }

  url = "http://localhost:8080/login";

  submitLogin (email: string, password: string){
    this.httpClient.post(this.url, {
      "email" : email,
      "password" : password,
    }).subscribe({
      next: (data) => {
        console.log(`Login with email: ${email} and password: ${password}`);
      },
      error: error => console.log(error),
    });
  }
}

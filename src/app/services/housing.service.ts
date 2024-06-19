import { Injectable } from '@angular/core';
import { HousingLocation } from '../interfaces/housinglocation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private httpClient: HttpClient) { 

  }

  housesUrl = 'http://localhost:8080/houses';
  applicationUrl = "http://localhost:8080/application"


  getHouse(id : number) : Observable<HousingLocation>{
    return  this.httpClient.get<HousingLocation>(`${this.housesUrl}/${id}`, {
      responseType: 'json'
    }) as Observable<HousingLocation>
  }

  submitApplication(firstName: string, lastName: string, email: string, houseId: number){
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}, houseID: ${houseId} `);
    this.httpClient.post(`${this.applicationUrl}/add`, {
      "firstname" : firstName,
      "lastname" : lastName,
      "email" : email,
      "houseID" : houseId
    }).subscribe({
      next: data => console.log("OK"), // Maybe add Alert Box that shows application confirmed
      error: error => console.log(error)
    });
  }

  getAllHouses() : Observable<HousingLocation[]> {
    return this.httpClient.get<HousingLocation[]>(`${this.housesUrl}`, {
      responseType: 'json',
    }) as Observable<HousingLocation[]>;
  }
}
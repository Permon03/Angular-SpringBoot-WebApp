import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../interfaces/housinglocation';
import { HousingService } from '../services/housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  housingService: HousingService = inject(HousingService);

  constructor() {
    // this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
    //   this.housingLocationList = housingLocationList;
    //   this.filteredLocationList = this.housingLocationList;
    // })


    // Get all the houses at the start
    this.housingService.getAllHouses().subscribe({
      next: (data) => {
        this.housingLocationList = data;
        this.filteredLocationList = this.housingLocationList;
      },
      error: error => console.log("Error in get all houses: " + error)
    })

    this.housingService.getHouse(1).subscribe({
      next: (data : HousingLocation) => {
        console.log(data);
        this.housingLocation = data;
      },
      error: error => console.log("Error in getHouse by id: " + error)
    })
  }

  // @TODO change pictures to pictures from RESTAPI Spring Boot
  housingLocationList: HousingLocation[] = [];

  filteredLocationList: HousingLocation[] = [];

  housingLocation!: HousingLocation;

  filterResults(text: string){
    if(!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((housingLocation) => housingLocation?.city.toLowerCase().includes(text.toLowerCase()))
  }
}

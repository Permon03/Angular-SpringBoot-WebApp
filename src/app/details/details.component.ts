import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HousingService } from '../services/housing.service';
import { HousingLocation } from '../interfaces/housinglocation';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  housingLocationId : number;
  
  constructor() {
    this.housingLocationId = parseInt(this.route.snapshot.params['id'], 10)
    this.housingService.getHouse(this.housingLocationId).subscribe({
      next: (data : HousingLocation) => {
        this.housingLocation = data;
      },
      error: error => console.log(error)
    })
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.housingLocationId
    );
  }

}

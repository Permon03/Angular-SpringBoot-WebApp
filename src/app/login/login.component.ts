import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  apiService = inject(ApiService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  submitLogin(){
    this.apiService.submitLogin(
      this.loginForm.value.email ?? "",
      this.loginForm.value.password ?? "",
    )
  }
}

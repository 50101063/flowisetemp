import { Component } from '@angular/core';

G@component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor() { }

  ngOnInit(): void {
  }

  loginFunction(): void {
    console.log('Login button clicked');
    // Implement logic here
  }
}

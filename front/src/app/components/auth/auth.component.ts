import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginRequest } from 'src/app/models/loginRequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cf-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public authService: AuthService) { }

  loginForm: FormGroup = this.formBuilder.group({
    username:'',
    password: ''
  });
  

  ngOnInit(): void {
  }

  get f() { return this.loginForm.controls; }

  login(): void{
    this.authService.signin(new LoginRequest(this.loginForm.get('username')?.value,this.loginForm.get('password')?.value)).subscribe( token => {
      localStorage.setItem("token",token.token);
    });
  }



}

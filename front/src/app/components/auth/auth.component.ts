import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/models/loginRequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'cf-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  submitted: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  constructor(public formBuilder: FormBuilder, public authService: AuthService) { }


  ngOnInit(): void {

    this.loginForm.valueChanges.subscribe(value => {
      this.submitted = false;
    });

  }


  login(): void {
    this.submitted = true;
    if (this.loginForm.valid) {

      this.authService.signin(new LoginRequest(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)).subscribe({
        next: (token) => {
          localStorage.setItem("token", token.token);
          window.location.reload();
        },
        error: (err) => {
          switch (err.status) {
            case 403:
              this.loginForm.get('password')?.setErrors({ noToken: true });

              break;
            case 0:
              this.loginForm.get('password')?.setErrors({ unreachable: true });

              break;

            default:
              break;
          }
        }

      });
    }
  }

}

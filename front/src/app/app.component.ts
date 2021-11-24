import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'cf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatter';

  isAuth: boolean = false;

  constructor(private authService: AuthService){}

  
  ngOnInit(): void {
    if(this.authService.isAuth())
    this.isAuth = true;
    
  }


}

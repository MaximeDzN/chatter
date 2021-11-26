import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'cf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  users: User[] = [];
  user: User = this.authService.decodedTokenToUser();

  constructor(private authService: AuthService,private userService: UserService, private messageService: MessageService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.authService.isAuth())
    this.userService.findAllExceptUser(this.user.id).subscribe({
      next: (users) => {
        this.users = users.sort((a,b)=> a.id - b.id);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  logout(){
    this.authService.logout();
  }

}

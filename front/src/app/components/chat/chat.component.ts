import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'cf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user: User = this.authService.decodedTokenToUser();

  constructor(public messageService: MessageService,private formBuilder: FormBuilder,
    public authService: AuthService) { }

  messageForm: FormGroup = this.formBuilder.group({
    message: ''
  });
  
  get f() { return this.messageForm.controls; }

  ngOnInit(): void {
  }


  sendMessage(){
    this.messageService.sendMessage(new Message(this.user.username,this.messageForm.get('message')?.value));
    this.messageForm.get('message')?.reset();
  }


  logout():void {
    this.authService.logout();
  }

}

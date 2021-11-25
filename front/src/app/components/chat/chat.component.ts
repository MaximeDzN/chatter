import { Component, ElementRef, IterableDiffer, IterableDiffers, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs';
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
  @ViewChildren('messages') messages!: QueryList<any>;
  @ViewChild('chat') chat!: ElementRef;
  constructor(public messageService: MessageService, private formBuilder: FormBuilder,
    public authService: AuthService) { }



  messageForm: FormGroup = this.formBuilder.group({
    message: ['', Validators.required]
  });

  get f() { return this.messageForm.controls; }

  ngOnInit(): void {
    this.messageService.findAll();
  }

  ngAfterViewInit() {
    this.messages.changes.subscribe(this.scrollToBottom);
  }


  sendMessage() {
    if (this.messageForm.valid) {
      this.messageService.sendMessage(new Message(this.user.username, this.messageForm.get('message')?.value, new Date()));
      this.messageForm.get('message')?.reset();
    }

  }

  preventAction(event: any) {
    event.preventDefault();
  }


  logout(): void {
    this.authService.logout();
  }
  scrollToBottom = () => {
    try {
      this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
    } catch (err) { }
  }

}

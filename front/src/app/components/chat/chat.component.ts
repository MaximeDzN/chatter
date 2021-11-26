import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatRoom } from 'src/app/models/chatRoom';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ChatRoomService } from 'src/app/services/chatRoom.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'cf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user: User = this.authService.decodedTokenToUser();
  otherUserId!: number;
  chatRoom!: ChatRoom;
  @ViewChildren('messages') messages!: QueryList<any>;
  @ViewChild('chat') chat!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private authService: AuthService,
    private chatRoomService: ChatRoomService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  messageForm: FormGroup = this.formBuilder.group({
    message: ['', Validators.required]
  });

  get f() { return this.messageForm.controls; }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.messageService.disconnect();
        this.otherUserId = params["id"];
        this.chatRoomService.findByUsers(this.user.id, this.otherUserId).subscribe({
          next: (chatRoom) => {
            this.chatRoom = chatRoom;
            this.messageService.connect(this.chatRoom.id);
            this.messageService.messages = this.chatRoom.messages.sort((a,b) => a.id - b.id);
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    this.messages.changes.subscribe(this.scrollToBottom);
  }


  sendMessage() {
    if (this.messageForm.valid) {
      this.messageService.sendMessage(new Message(this.user.id, this.messageForm.get('message')?.value, new Date(), this.chatRoom.id));
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

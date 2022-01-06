import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  user_id:any
  message = {
    content:"",
    receiver_number:""
  }

  error:any

  constructor(private authService: AuthService, private messageService: MessagesService, private router: Router) { }

  ngOnInit(): void {
    this.user_id = this.authService.getUser().id
    this.message.receiver_number = this.messageService.getReceiverNumber()
    
  }

  onSendSubmit(){
    console.log(this.message,this.user_id)
    this.messageService.addMessage(this.message,this.user_id)
        .subscribe(
          result => {
            // console.log('in login:', result)
            this.router.navigate(['/main/contacts/view_contacts'])
            // Handle result
            // console.log(result)
          },
          error => {
            // this.errors = error;
            // console.log(error.error.errors)
            this.error = error.error.errors;
            console.log(this.error)
          },
          () => {
            // this.router.navigate(['/main'])
            // 'onCompleted' callback.
            // No errors, route to new page here
          }
        );
    


  }

}

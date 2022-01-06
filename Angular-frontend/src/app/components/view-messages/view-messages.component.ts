import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-view-messages',
  templateUrl: './view-messages.component.html',
  styleUrls: ['./view-messages.component.css']
})
export class ViewMessagesComponent implements OnInit {
  user_id:any
  pageNumber:any = 0
  messages:any;
  searchTerm:any
  numberArray:any
  filter:any
  constructor(private router: Router, private messagesServices: MessagesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user_id = this.authService.getUser().id
    this.messagesServices.getDefaultMessages(this.user_id, this.pageNumber)
        .subscribe(
          result => {
            const temp:any = result
            this.messages = temp.messages
            this.pageNumber = temp.number
            this.numberArray = new Array(this.pageNumber)
            console.log(this.numberArray)
            console.log("from view contacts" , this.messages)
            // this.co
          },
          error => {
            // this.errors = error;
            console.log("from view contacts",error.error.errors)
            // this.error = error.error.errors;
            // console.log(this.error)
          },
          () => {
            // this.router.navigate(['/main'])
            // 'onCompleted' callback.
            // No errors, route to new page here
          }
        );
    
  }

  handleMessageClick(){
    // console.log("clicked")
    this.router.navigate(['/main/messaging/send_message'])
    
  }
  

}

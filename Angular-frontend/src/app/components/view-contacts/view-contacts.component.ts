import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent implements OnInit {
  user_id: string = "";
  contacts:any;
  searchTerm:any="";
  filter:any ="";
  numberOfPages:any
  numberArray:any
  pageNumber:any=0;


  constructor( private authService: AuthService, private contactService: ContactsService, private router: Router, private messageSevrice: MessagesService) { }


  ngOnInit(): void {
    this.user_id = this.authService.user.id
    this.contacts = this.contactService.contacts

    this.contactService.getDefaultContacts(this.user_id,this.pageNumber)
        .subscribe(
          result => {
            const temp:any = result
            this.contacts = temp.contacts
            this.numberOfPages = temp.number
            this.numberArray = new Array(this.numberOfPages)
            console.log(this.numberArray)
            console.log(this.contacts)
            // this.contactService.setContacts(this.contacts, this.numberOfPages)
            // this.authService.setUser(result);
            // Handle result
          },
          error => {
            // this.errors = error;
            // console.log(error.error.errors)
            // this.error = error.error.errors;
            console.log("error in add user",error)
          },
          () => {
            // this.router.navigate(['/main'])
            // 'onCompleted' callback.
            // No errors, route to new page here
          }
        );
    
  }

  deleteContact(id:any){
    console.log(id);
    this.contactService.deleteContact(id).subscribe(
      result => {
         
        console.log(result)
        this.ngOnInit();
        // this.contactService.getDefaultContacts(this.user_id).subscribe(
        //   (result) => {
        //     const temp: any = result;
        //     // this.contactService.setContacts(temp.contacts);
        //     this.ngOnInit();
        //   },
        //   (error) => {
        //     console.log('error in add user', error);
        //   },
        //   () => {}
        // );
      },
      error => {
        // this.errors = error;
        // console.log(error.error.errors)
        // this.error = error.error.errors;
        console.log(error)
      },
      () => {
        // this.router.navigate(['/main'])
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }

  onSearchSubmit(){

  }

  getContactsHandle(pageNumberPlus:any){
    console.log(pageNumberPlus)
    this.pageNumber = pageNumberPlus
    this.ngOnInit();

  }

  sendMessage(user_id:any, receiver_number:any){
    this.router.navigate(['/main/contacts/send_message'])
    this.messageSevrice.setReceiverNumber(receiver_number)
  }

}

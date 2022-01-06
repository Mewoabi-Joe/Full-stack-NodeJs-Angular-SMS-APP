import { Component, Input, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-one-contact',
  templateUrl: './one-contact.component.html',
  styleUrls: ['./one-contact.component.css']
})
export class OneContactComponent implements OnInit {
  @Input() contact:any
  @Input() user_id:any

  constructor(private contactService: ContactsService) { }

  ngOnInit(): void {
  }

  deleteContact(id:any){
    console.log(id);
    this.contactService.deleteContact(id).subscribe(
      result => {
         
        console.log(result)
        // this.contactService.getDefaultContacts(this.user_id).subscribe(
        //   (result) => {
        //     const temp: any = result;
        //     // this.contactService.setContacts(temp.contacts);
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

}

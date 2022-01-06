import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  user_id: string = '';

  user = {
    name: '',
    number: '',
    group: '',
  };
  error = {
    name: '',
    number: '',
    group: '',
  };

  constructor(
    private router: Router,
    private contactsService: ContactsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.user);
    this.error = {
      name: '',
      number: '',
      group: '',
    };
    this.contactsService
      .addContact(this.user, this.authService.user.id)
      .subscribe(
        (result) => {
          console.log(result);
          // this.authService.setUser(result);
          // Handle result
          // console.log(result)
        },
        (error) => {
          // this.errors = error;
          // console.log(error.error.error)
          this.error = error.error.error;
          // console.log(this.error)
        },
        () => {
          // this.contactsService.getDefaultContacts(this.user_id).subscribe(
          //   (result) => {
          //     const temp: any = result;
          //     this.contactsService.setContacts(temp.contacts,temp.number);
          //   },
          //   (error) => {
          //     console.log('error in add user', error);
          //   },
          //   () => {}
          // );
          this.router.navigate(['/main/contacts/view_contacts'])
          // 'onCompleted' callback.
          // No errors, route to new page here
        }
      );
  }
}

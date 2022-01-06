import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { EmailComponent } from './components/email/email.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { PasswordComponent } from './components/password/password.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { SendMessagesComponent } from './components/send-messages/send-messages.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewContactsComponent } from './components/view-contacts/view-contacts.component';
import { ViewMessagesComponent } from './components/view-messages/view-messages.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
    // redirectTo: 'main',
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify_email', component: EmailComponent },
  { path: 'reset_password', component: PasswordComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full',
      },
      {
        path: 'contacts',
        component: ContactsComponent,
        children: [
          {
            path: '',
            redirectTo: 'view_contacts',
            pathMatch: 'full',
          },
          {
            path: 'view_contacts',
            component: ViewContactsComponent,
          },
          {
            path: 'add_contact',
            component: AddContactComponent,
          },
          {
            path: 'send_message',
            component: SendMessageComponent,
          },
        ],
      },
      {
        path: 'messaging',
        component: MessagingComponent,
        children: [
          {
            path: '',
            redirectTo: 'view_messages',
            pathMatch: 'full',
          },
          {
            path: 'view_messages',
            component: ViewMessagesComponent,
          },
          // {
          //   path: 'send_message',
          //   component: SendMessagesComponent,
          // },
        ],
      },
    ],
  },
  // { path: 'contacts', component: ContactsComponent },
  // { path: 'messaging', component: MessagingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

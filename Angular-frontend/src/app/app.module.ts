import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { AuthService } from './services/auth.service';
import { reducer } from './reducers/auth.reducer';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ViewContactsComponent } from './components/view-contacts/view-contacts.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactsService } from './services/contacts.service';
import { OneContactComponent } from './components/one-contact/one-contact.component';
import { ViewMessagesComponent } from './components/view-messages/view-messages.component';
import { SendMessagesComponent } from './components/send-messages/send-messages.component';
import { EmailComponent } from './components/email/email.component';
import { PasswordComponent } from './components/password/password.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { MessagesService } from './services/messages.service';

// import { FlashMessagesModule } from 'angular2-flash-messages'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    ContactsComponent,
    MessagingComponent,
    SidebarComponent,
    ViewContactsComponent,
    AddContactComponent,
    OneContactComponent,
    ViewMessagesComponent,
    SendMessagesComponent,
    EmailComponent,
    PasswordComponent,
    SendMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // FlashMessagesModule.forRoot(),
    // StoreModule.forRoot({
    //   auth: reducer
    // })
  ],
  providers: [AuthService, ContactsService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

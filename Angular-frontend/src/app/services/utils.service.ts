import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  active = "contacts"

  constructor() { }
  switchToMessaging(){
    this.active = "messaging"
  }
  switchToContacts(){
    this.active = "contacts"
  }
  

}

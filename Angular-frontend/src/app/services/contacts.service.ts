import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import host from '../host';


let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ContactsService {

    private ContactUrl:string = `${host}/contacts/`;
    contacts:any 
    numberOfPages:any

  constructor(private http:HttpClient) {

  }

  getDefaultContacts(user_id:string,pageNumber:any){
    console.log('from contact service', user_id) 
     const url = this.ContactUrl+ user_id+'?page='+pageNumber;
     console.log('from contact service',this.ContactUrl)
    return this.http.get(url,httpOptions);
    
  }

  addContact(user:any,user_id:any){
    const url = this.ContactUrl + user_id;
    return this.http.put(url,user,httpOptions);
  }

  deleteContact(id:any){
    const url = this.ContactUrl + "delete/" + id;
    console.log(url)
    return this.http.delete(url);

  }

  setContacts(res:any,pages:any){
    this.contacts = res;
    this.numberOfPages = pages;
    // console.log(this.contacts)
  }


}

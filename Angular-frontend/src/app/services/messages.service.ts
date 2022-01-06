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
export class MessagesService {

    private MessageUrl:string = `${host}/messages/`;
    messages:any 
    numberOfPages:any
    receiver_number:any

  constructor(private http:HttpClient) {

  }

  getDefaultMessages(user_id:string,pageNumber:any){
    // console.log('from contact service', user_id) 
     const url = this.MessageUrl+ user_id+'?page='+pageNumber;
     console.log('from contact service',this.MessageUrl)
    return this.http.get(url,httpOptions);
    
  }

  addMessage(message:any,user_id:any){
    const url = this.MessageUrl + user_id;
    console.log("From message service",url,message)
    return this.http.put(url,message,httpOptions);
  }

  setReceiverNumber(contact:any){
    this.receiver_number = contact
  }
  getReceiverNumber(){
    return this.receiver_number;
  }

  // deleteContact(id:any){
  //   const url = this.ContactUrl + "delete/" + id;
  //   console.log(url)
  //   return this.http.delete(url);

  // }

  // setContacts(res:any,pages:any){
  //   this.contacts = res;
  //   this.numberOfPages = pages;
  //   // console.log(this.contacts)
  // }


}

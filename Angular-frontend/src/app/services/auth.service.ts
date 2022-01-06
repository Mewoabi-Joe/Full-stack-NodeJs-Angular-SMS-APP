  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import host from '../host';

  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    user = {
      id:  "",
      first_name :""
    }

    token: string = "";

    private loginUrl:string = `${host}/auth/login`;
    private signupUrl:string = `${host}/auth/signup`;
    private mainUrl:string = `${host}/main`;
    private verifyEmailUrl:string = `${host}/auth/verify_email`


    constructor(private http:HttpClient) { }

    signupUser(user:any){
      return this.http.post(this.signupUrl,user,httpOptions);
    }

    loginUser(user:any){
      return this.http.post(this.loginUrl,user,httpOptions);
    }


    setUser(res:any){
      this.user = res.user;
      this.token = res.token;
      localStorage.setItem('token',this.token);
      localStorage.setItem('user',JSON.stringify(this.user));
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token
        })
      }
      // console.log('in service:', this.user) ;


    }

    getUser(){
      return this.user;
    }

    logoutUser(){
      this.user = {
        id:  "",
        first_name :""
      };
      this.token = '';
      localStorage.clear();
    }

    verifyEmail(user:any){
      return this.http.post(this.verifyEmailUrl,user,httpOptions);
    }

    getMain(){
      // console.log('in services main:',this.user, this.token);
      return this.http.get(this.mainUrl,httpOptions);
    }
  }

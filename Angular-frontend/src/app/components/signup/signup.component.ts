import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    first_name:"",
    last_name:"",
    email:"",
    number:"",
    password:""
  }
  error = {
    first_name:"",
    last_name:"",
    email:"",
    number:"",
    password:"",
    vPassword:""
  }

  vPassword="";


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(){
    this.error = {
      first_name:"",
      last_name:"",
      email:"",
      number:"",
      password:"",
      vPassword:""
    }
  ;
    if(this.user.password != this.vPassword){
      this.error.vPassword = "The passwords do not match";
      console.log(this.error.vPassword)
    }else{
        this.authService.signupUser(this.user)
        .subscribe(
          result => {
            console.log(result)
            this.authService.setUser(result);
            // Handle result
            // console.log(result)
          },
          error => {
            // this.errors = error;
            // console.log(error.error.errors)
            this.error = error.error.errors;
            console.log(this.error)
          },
          () => {
            this.router.navigate(['/main'])
            // 'onCompleted' callback.
            // No errors, route to new page here
          }
        );
    }

    
  }
}

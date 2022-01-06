import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email:"",
    password:""
  }
   
  error = {
    email:"",
    password:""
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.error = {
      email:"",
      password:""
    }
  ;
        this.authService.loginUser(this.user)
        .subscribe(
          result => {
            // console.log('in login:', result)
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

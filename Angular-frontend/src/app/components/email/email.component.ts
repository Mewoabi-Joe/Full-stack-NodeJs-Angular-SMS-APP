import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  user={
    email:""
  }

  error={
    email:""
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.verifyEmail(this.user)
    .subscribe(
      result => {
        console.log('in email:', result)
        this.authService.setUser(result);
        // Handle result
        // console.log(result)
      },
      error => {
        // this.errors = error;
        console.log('in email',error.error.errors)
        this.error = error.error.errors;
        console.log(this.error)
      },
      () => {
        // this.router.navigate(['/main'])
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );

  }

}

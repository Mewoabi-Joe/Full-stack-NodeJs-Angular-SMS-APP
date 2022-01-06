import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  // user = {
  //   id: '',
  //   first_name: '',
  // };

  // private authService: AuthService, private router: Router
  constructor() {}

  ngOnInit(): void {
    // this.user = this.authService.getUser();
    // console.log('in main component:', this.user);
    // this.authService.getMain().subscribe(
    //   (result) => {
    //     const res: any = result;
    //     if (res.error_msg) {
    //     console.log('auth error:',res.error_msg);

    //       this.router.navigate(['/']);
    //     }
    //     //   // Handle result

    //     // console.log(result)
    //   },
    //   (error) => {
    //     console.log('auth error:', error);
    //     // console.log(error.error.errors)
    //   },
    //   () => {
    //     // 'onCompleted' callback.
    //     // No errors, route to new page here
    //     // this.user = this.authService.getUser();
    //   }
    // );
  }

  // logout() {
  //   this.authService.logoutUser();
  // }
}

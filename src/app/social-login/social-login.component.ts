import { Component, OnInit } from '@angular/core';

import {MatDialogRef} from '@angular/material';
import { AuthService as BackendAuthService } from '../services/auth.service';
import { AuthService } from 'angular-6-social-login';
import { SocialUser } from 'angular-6-social-login';
import {
    FacebookLoginProvider,
    GoogleLoginProvider,
    LinkedinLoginProvider 
} from 'angular-6-social-login';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

  user: SocialUser;
  errMess: string;

  constructor(public dialogRef: MatDialogRef<SocialLoginComponent>,
    private authService: AuthService,
    private BackendAuthService: BackendAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        if (userData) {
          console.log('User: ', userData);
          this.BackendAuthService.socialLogIn(userData)
            .subscribe(res => {
              if (res.success) {
                this.dialogRef.close(res.success);
              } else {
                console.log(res);
              }
            },
            error => {
              console.log(error);
              this.errMess = error;
            });
          console.log(" sign in data : " , userData);
        } else {
          console.log("error");
        }
      });
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}

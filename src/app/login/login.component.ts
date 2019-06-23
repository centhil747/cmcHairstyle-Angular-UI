import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};
  newUser = {username: '', password: '', firstname: '', lastname: ''};
  errMess: string;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSignUp() {
    console.log('User: ', this.newUser);
    this.authService.signUp(this.newUser)
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
  }

  onLogin() {
    console.log('User: ', this.user);
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          this.dialogRef.close(res.success);
          this.openSnackBar('Logged in Successfully', 'Close', 'green-snackbar')
        } else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMess = error;
        this.openSnackBar(this.errMess, 'Close', 'red-snackbar')
      });
  }

  openSnackBar(message: string, action: string, className: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      panelClass: [className]
    });
  }
}

import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthModel} from '../auth.model';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  isLoggingIn = true;
  user: AuthModel;
  processing = false;
  @ViewChild('password') password: ElementRef;
  @ViewChild('confirmPassword') confirmPassword: ElementRef;

  constructor() {
    this.user = new AuthModel();
    this.user.email = 'user@nativescript.org';
    this.user.password = 'password';
  }

  ngOnInit() {
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {
    if (!this.user.email || !this.user.password) {
      this.alert('Please provide both an email address and password.');
      return;
    }

    this.processing = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    /*this.userService.login(this.user)
      .then(() => {
        this.processing = false;
        this.routerExtensions.navigate(['/home'], {clearHistory: true});
      })
      .catch(() => {
        this.processing = false;
        this.alert('Unfortunately we could not find your account.');
      });*/
  }

  register() {
    if (this.user.password !== this.user.confirmPassword) {
      this.alert('Your passwords do not match.');
      return;
    }
    /*this.userService.register(this.user)
      .then(() => {
        this.processing = false;
        this.alert('Your account was successfully created.');
        this.isLoggingIn = true;
      })
      .catch(() => {
        this.processing = false;
        this.alert('Unfortunately we were unable to create your account.');
      });*/
  }

  forgotPassword() {
    /*prompt({
      title: 'Forgot Password',
      message: 'Enter the email address you used to register for APP NAME to reset your password.',
      inputType: 'email',
      defaultText: '',
      okButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }).then((data) => {
      if (data.result) {
        this.userService.resetPassword(data.text.trim())
          .then(() => {
            this.alert('Your password was successfully reset. Please check your email for instructions on choosing a new password.');
          }).catch(() => {
          this.alert('Unfortunately, an error occurred resetting your password.');
        });
      }
    });*/
  }

  focusPassword() {
    this.password.nativeElement.focus();
  }

  focusConfirmPassword() {
    if (!this.isLoggingIn) {
      this.confirmPassword.nativeElement.focus();
    }
  }

  alert(message: string) {
    return alert({
      title: 'APP NAME',
      okButtonText: 'OK',
      message: message
    });
  }

}

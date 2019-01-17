import {Injectable} from '@angular/core';
import {AuthModel} from './auth.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  register(user: AuthModel) {
  }

  login(user: AuthModel) {
  }

  logout() {
  }

  resetPassword(email) {
  }

  handleErrors(error) {
    console.error(error.message);
    return Promise.reject(error.message);
  }
}

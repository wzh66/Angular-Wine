import {Component, OnInit} from '@angular/core';
import {DialogService} from 'ngx-weui';

import {AuthService} from '../../auth/auth.service';
import {UserService} from '../../../@core/data/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  key;

  constructor(private dialogSvc: DialogService, private authSvc: AuthService, private userSvc: UserService) {
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.userSvc.get(this.key).subscribe(res => {
      console.log(res);
    });
  }

  logout() {
    this.authSvc.logout();
  }
}

import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../@core/data/user.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class AdminUserComponent implements OnInit {
  user;
  key = this.authSvc.getKey();

  constructor(private userSvc: UserService,
              private authSvc: AuthService) {
  }

  ngOnInit() {
    this.userSvc.get(this.key).subscribe(res => {
      if (!res) {
        return false;
      }
      this.user = res;
      console.log(res);
    });
  }

}

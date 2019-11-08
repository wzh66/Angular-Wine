import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../@core/data/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class AdminUserComponent implements OnInit {
  user;

  constructor(private userSvc: UserService) {
  }

  ngOnInit() {
    this.userSvc.get().subscribe(res => {
      if (!res) {
        return false;
      }
      this.user = res;
      console.log(res);
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../@core/data/user.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-admin-marketing-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class AdminMarketingCommissionComponent implements OnInit {
  key = this.authSvc.getKey();
  user;

  constructor(private userSvc: UserService,
              private authSvc: AuthService) {
    this.userSvc.get(this.key).subscribe(res => {
      this.user = res;
      console.log(this.user);
    });
  }

  ngOnInit() {
  }

}

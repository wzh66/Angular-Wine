import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DialogService} from 'ngx-weui';

import {AuthService} from '../../auth/auth.service';
import {UserService} from '../../../@core/data/user.service';
import {AddressService} from '../setting/address/address.service';
import {FooterService} from '../../../@theme/modules/footer/footer.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  key = this.authSvc.getKey();
  user;
  address;

  constructor(private router: Router,
              private dialogSvc: DialogService,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private userSvc: UserService,
              private addressSvc: AddressService) {
    footerSvc.setActive(3);
    addressSvc.get(this.key).subscribe(res => {
      console.log(res);
      this.address = res.list[0];
      res.list.forEach(address => {
        if (address.status === 1) {
          this.address = address;
          console.log(this.address);
        }
      });
    });
  }

  ngOnInit() {
    this.userSvc.get(this.key).subscribe(res => {
      this.user = res;
    });
  }

  toAddress(hasAddr) {
    if (hasAddr) {
      this.router.navigate(['/admin/setting/address']);
    } else {
      this.router.navigate(['/admin/setting/address/add']);
    }
  }

  logout() {
    this.authSvc.logout();
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DialogService} from 'ngx-weui';

import {UaService} from '../../../@core/data/ua.service';
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
  address;

  constructor(private router: Router,
              public uaSvc: UaService,
              private dialogSvc: DialogService,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private userSvc: UserService,
              private addressSvc: AddressService) {
    footerSvc.setActive(3);
    addressSvc.get().subscribe(res => {
      if (!res) {
        return false;
      }
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
  }

  toAddress(hasAddr) {
    if (hasAddr) {
      this.router.navigate(['/admin/setting/address']);
    } else {
      this.router.navigate(['/admin/setting/address/edit/0']);
    }
  }

  logout() {
    this.authSvc.logout();
  }
}

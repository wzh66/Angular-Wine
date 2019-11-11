import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FooterService} from '../../../@theme/modules/footer/footer.service';
import {AuthService} from '../../auth/auth.service';
import {AddressService} from '../setting/address/address.service';
import {UserService} from '../../../@core/data/user.service';
import {PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class AdminProfileComponent implements OnInit {
  key;
  addresses;
  selectedAddress;
  profileForm: FormGroup;

  constructor(private router: Router,
              private pickerSvc: PickerService,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private addressSvc: AddressService,
              private userSvc: UserService) {
    footerSvc.setActive(3);
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();

    this.profileForm = new FormGroup({
      key: new FormControl(this.authSvc.getKey(), [Validators.required]),
      username: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      addressId: new FormControl('', [Validators.required])
    });

    this.userSvc.get(this.key).subscribe(res => {
      this.profileForm.get('username').setValue(res.username);
      this.profileForm.get('phone').setValue(res.phone);
    });
    this.addressSvc.get(this.key).subscribe(res => {
      const addresses = [];
      console.log(res.list);
      res.list.forEach(address => {
        const item = {
          label: address.consignee + ' ' + address.province + address.city + address.district + address.address,
          value: address.id
        };
        addresses.push(item);
        if (address.status === 1) {
          this.selectedAddress = item.label;
        }
      });
      this.addresses = addresses;
    });
  }

  showPicker() {
    if (this.addresses.length < 1) {
      this.router.navigate(['/admin/setting/address/edit/0']);
      return false;
    }
    this.pickerSvc.show([this.addresses], '', [0], {cancel: '取消', confirm: '确认'}).subscribe(res => {
      this.selectedAddress = res.items[0].label;
      console.log(this.selectedAddress);
    });
  }
}

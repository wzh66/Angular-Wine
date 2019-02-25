import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
              private authSvc: AuthService,
              private addressSvc: AddressService,
              private userSvc: UserService) {
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();

    this.profileForm = new FormGroup({
      key: new FormControl(this.authSvc.getKey(), [Validators.required]),
      username: new FormControl(this.authSvc.getKey(), [Validators.required]),
      phone: new FormControl(this.authSvc.getKey(), [Validators.required]),
      addressId: new FormControl(this.authSvc.getKey(), [Validators.required])
    });

    this.userSvc.get(this.key).subscribe(res => {
      console.log(res);
      this.profileForm.get('username').setValue(res.username);
      this.profileForm.get('phone').setValue(res.phone);
    });
    this.addressSvc.get(this.key).subscribe(res => {
      const addresses = [];
      res.list.forEach(address => {
        console.log(address);
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
      this.router.navigate(['/admin/setting/address/add']);
      return false;
    }
    this.pickerSvc.show([this.addresses], '', [0], {cancel: '取消', confirm: '确认'}).subscribe(res => {
      this.selectedAddress = res.items[0].label;
      console.log(this.selectedAddress);
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {StorageService} from '../../../../@core/utils/storage.service';
import {FooterService} from '../../../../@theme/modules/footer/footer.service';
import {AuthService} from '../../../auth/auth.service';
import {AddressService} from './address.service';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-admin-setting-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AdminSettingAddressComponent implements OnInit {

  key;

  settingForm: FormGroup;
  loading = false;

  addresses = [];

  constructor(private router: Router,
              private location: LocationStrategy,
              private storageSvc: StorageService,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private addressSvc: AddressService,
              private dialogSvc: DialogService) {
    footerSvc.setActive(3);
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();

    this.settingForm = new FormGroup({
      key: new FormControl(this.key, [Validators.required]),
      addrId: new FormControl('', [Validators.required])
    });

    this.getAddresses();
  }

  getAddresses() {
    this.addressSvc.get(this.key).subscribe(res => {
      this.addresses = res.list;
      console.log(this.addresses);
    });
  }

  del(id) {
    this.settingForm.get('addrId').setValue(id);
    this.dialogSvc.show({title: '', content: '您确定要删除地址吗？', cancel: '取消', confirm: '确定'}).subscribe(value => {
      if (value.value) {
        this.addressSvc.del(this.settingForm.value).subscribe(res => {
          this.getAddresses();
        });
      }
    });
  }

  back() {
    this.location.back();
  }
}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {StorageService} from '../../../../@core/utils/storage.service';
import {AuthService} from '../../../auth/auth.service';
import {AddressService} from './address.service';

@Component({
  selector: 'app-admin-setting-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AdminSettingAddressComponent implements OnInit {

  appKey;

  settingForm: FormGroup;
  loading = false;

  addresses;

  constructor(private storageSvc: StorageService,
              private authSvc: AuthService,
              private addressSvc: AddressService) {
  }

  ngOnInit() {
    this.appKey = this.authSvc.getKey();

    this.settingForm = new FormGroup({
      key: new FormControl('', [Validators.required]),
      addrId: new FormControl('', [Validators.required])
    });

    this.settingForm.get('key').setValue(this.appKey);

    this.getAddresses();
  }

  getAddresses() {
    this.addressSvc.get(this.appKey).subscribe(res => {
      this.addresses = res.list;
    });
  }

  del(id) {
    this.settingForm.get('addrId').setValue(id);
    this.addressSvc.del(this.settingForm.value).subscribe(res => {
      this.getAddresses();
    });
  }

}

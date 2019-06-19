import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Uploader, UploaderOptions, PickerService, DialogService, ToastService} from 'ngx-weui';

import {GeoService} from '../../../@core/data/geo.service';
import {AuthService} from '../../auth/auth.service';
import {FooterService} from '../../../@theme/modules/footer/footer.service';
import {IndustryService} from './industry.service';
import {SellerService} from './seller.service';

declare var qq: any;

@Component({
  selector: 'app-admin-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})

export class AdminSellerComponent implements OnInit {
  key = this.authSvc.getKey();
  img: any;
  imgShow = false;
  industries = [];

  sellerForm: FormGroup;
  loading = false;

  uploader: Uploader = new Uploader({
    url: this.prefix_url + 'uploadStoreLogo',
    limit: 1,
    auto: true,
    // headers: [{name: 'auth', value: 'test'}],
    params: {
      key: this.key
    },
    onUploadSuccess: (file, res) => {
      const _res = JSON.parse(res);
      console.log(_res);
      this.sellerForm.get('logo').setValue(_res.result);
    }
  } as UploaderOptions);

  constructor(@Inject('PREFIX_URL') private prefix_url,
              private location: Location,
              private geoSvc: GeoService,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private pickerSvc: PickerService,
              private industrySvc: IndustryService,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private sellerSvc: SellerService) {
    footerSvc.setActive(3);
  }

  ngOnInit() {

    this.sellerForm = new FormGroup({
      key: new FormControl(this.key, [Validators.required]),
      storeId: new FormControl('', []),
      storeName: new FormControl('', [Validators.required]),
      industryId: new FormControl('', [Validators.required]),
      contacts: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      pwd: new FormControl('', []),
      logo: new FormControl('', []),
      x: new FormControl('', [Validators.required]),
      y: new FormControl('', [Validators.required]),
      areaCode: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      synopsis: new FormControl('', [])
    });

    this.industrySvc.get(this.key).subscribe(res => {
      const items = [];
      res.forEach((industry, index) => {
        const item = {
          label: industry.name,
          value: industry.id
        };
        items.push(item);
      });
      this.industries = items;
    });

    this.sellerSvc.get(this.key).subscribe(res => {
      for (const key in this.sellerForm.value) {
        if (res[key.toLowerCase()] || key === 'storeId') {
          if (key === 'storeId') {
            this.sellerForm.get('storeId').setValue(res['id']);
          } else {
            this.sellerForm.get(key).setValue(res[key.toLowerCase()]);
          }
        }
      }
      if (this.sellerForm.get('storeId').value) {
        if (this.sellerForm.get('x').invalid || this.sellerForm.get('y').invalid) {
          this.geoSvc.get().then(() => {
            const geo = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
            geo.getLocation((position) => {
              const body = {key: this.sellerForm.get('key').value, lat: position.lat, lng: position.lng};
              this.geoSvc.getPosition(body).subscribe((result) => {
                this.sellerForm.get('x').setValue(result.location.lng);
                this.sellerForm.get('y').setValue(result.location.lat);
              });
            }, (err) => {
              this.dialogSvc.show({content: '请打开授权或打开定位开关', cancel: '', confirm: '我知道了'}).subscribe();
            }, {failTipFlag: true});
          });
        }
      } else {
        this.geoSvc.get().then(() => {
          const geo = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
          geo.getLocation((position) => {
            const body = {key: this.sellerForm.get('key').value, lat: position.lat, lng: position.lng};
            this.geoSvc.getPosition(body).subscribe((result) => {
              this.sellerForm.get('address').setValue(result.addressComponent.street + result.sematic_description);
              this.sellerForm.get('areaCode').setValue(result.addressComponent.adcode);
              this.sellerForm.get('x').setValue(result.location.lng);
              this.sellerForm.get('y').setValue(result.location.lat);
            });
          }, (err) => {
            this.dialogSvc.show({content: '请打开授权或打开定位开关', cancel: '', confirm: '我知道了'}).subscribe();
          }, {failTipFlag: true});
        });
      }
    });
  }

  showPicker() {
    this.pickerSvc.show([this.industries], '', null, {cancel: '返回', confirm: '确认'}).subscribe(res => {
      console.log(res.value);
      this.sellerForm.get('industryId').setValue(res.value);
    });
  }

  onGallery(item: any) {
    this.img = [{file: item._file, item}];
    this.imgShow = true;
  }

  onDel(item: any) {
    this.uploader.removeFromQueue(item.item);
  }

  submit() {
    // if (this.sellerForm.invalid || this.loading) {
    //   return false;
    // }
    // this.loading = true;
    // this.toastSvc.loading('申请中');
    // this.sellerSvc.create(this.sellerForm.value).subscribe(res => {
    //   this.loading = false;
    //   this.toastSvc.hide();
    //   this.dialogSvc.show({content: '您的入驻申请已成功提交！', confirm: '我知道了', cancel: ''}).subscribe(() => {
    //     this.location.back();
    //   });
    // });

    if (this.loading || this.sellerForm.invalid) {
      return false;
    }
    this.loading = true;
    this.toastSvc.loading('操作中...', 0);
    this.geoSvc.gps({
      key: this.authSvc.getKey(),
      city: this.sellerForm.get('areaCode').value,
      addr: this.sellerForm.get('address').value
    }).subscribe(res => {
      this.sellerForm.get('x').setValue(res.result.location.lng);
      this.sellerForm.get('y').setValue(res.result.location.lat);
      this.sellerSvc.create(this.sellerForm.value).subscribe(() => {
        this.loading = false;
        this.toastSvc.hide();
        this.dialogSvc.show({content: '您的入驻申请已成功提交！', confirm: '我知道了', cancel: ''}).subscribe(() => {
          this.location.back();
        });
      });
    });
  }
}

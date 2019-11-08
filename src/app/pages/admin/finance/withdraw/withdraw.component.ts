import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {ToastService, DialogService, UploaderOptions, Uploader} from 'ngx-weui';

import {AuthService} from '../../../auth/auth.service';
import {FinanceService} from '../finance.service';
import {UserService} from '../../../../@core/data/user.service';

@Component({
  selector: 'app-admin-finance-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class AdminFinanceWithdrawComponent implements OnInit {

  key = this.authSvc.getKey();
  withdrawForm: FormGroup;
  isSubmit = false;
  loading = false;
  phone;

  img: any;
  imgShow = false;
  uploader: Uploader = new Uploader({
    url: this.prefix_url + 'uploadWxQrCode',
    limit: 1,
    auto: true,
    params: {
      key: this.key
    },
    onUploadSuccess: (file, res) => {
      const _res = JSON.parse(res);
      console.log(_res);
      this.withdrawForm.get('code').setValue(_res.result);
    }
  } as UploaderOptions);

  constructor(@Inject('PREFIX_URL') private prefix_url,
              private router: Router,
              private location: LocationStrategy,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private authSvc: AuthService,
              private financeSvc: FinanceService,
              private userSvc: UserService) {
  }

  ngOnInit() {
    /*this.key = this.authSvc.getKey();*/
    this.withdrawForm = new FormGroup({
      /*key: new FormControl(this.key, [Validators.required]),*/
      /*openId: new FormControl(this.authSvc.getOid(), [Validators.required]),*/
      code: new FormControl('', [Validators.required]),
      money: new FormControl('', [Validators.required, Validators.min(0)]),
      phone: new FormControl('', [Validators.required, Validators.min(11)])
    });
    this.userSvc.get().subscribe(res => {
      this.withdrawForm.get('phone').setValue(res.phone);
      this.withdrawForm.get('code').setValue(res.wxQRCode);
    });
    /*this.withdrawForm.get('money').valueChanges.subscribe(value => {
      console.log(value);
      if (value % 10 !== 0) {
        this.withdrawForm.get('money').setErrors({error: ''});
      }
    });*/
  }

  confirm() {
    console.log(this.withdrawForm.value);
    this.isSubmit = true;
    if (this.withdrawForm.invalid || this.loading) {
      return false;
    }

    /*if (this.withdrawForm.get('money').value % 10 !== 0) {
      this.dialogSvc.show({title: '温馨提示', content: '您的提现金额必需是100的倍数', cancel: '', confirm: '我知道了'}).subscribe();
      return false;
    }*/

    this.loading = true;
    this.toastSvc.loading('提取中');
    this.financeSvc.withdrawal(this.withdrawForm.value).subscribe(res => {
      this.toastSvc.hide();
      this.loading = false;
      if (!res) {
        return false;
      }
      this.dialogSvc.show({
        title: '温馨提示',
        content: '您已成功提现' + this.withdrawForm.get('money').value + '元',
        cancel: '返回上一页',
        confirm: '继续提现'
      }).subscribe((_res) => {
        if (_res.value) {
        } else {
          this.location.back();
        }
      });
    });
  }

  onCustom(e) {
    console.log(e);
    this.router.navigate(['/admin/finance/records']);
  }

  cancel() {
    this.location.back();
  }


  onGallery(item: any) {
    this.img = [{file: item._file, item}];
    this.imgShow = true;
  }

  onDel(item: any) {
    console.log(item);
    this.uploader.removeFromQueue(item.item);
  }
}

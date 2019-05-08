import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {ToastService, DialogService, UploaderOptions, Uploader} from 'ngx-weui';

import {AuthService} from '../../../auth/auth.service';
import {FinanceService} from '../finance.service';

@Component({
  selector: 'app-admin-finance-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class AdminFinanceWithdrawComponent implements OnInit {

  key;
  withdrawForm: FormGroup;
  isSubmit = false;
  loading = false;

  constructor(private router: Router,
              private location: LocationStrategy,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private authSvc: AuthService,
              private financeSvc: FinanceService) {
  }

  ngOnInit() {
    this.key = this.authSvc.getKey();
    this.withdrawForm = new FormGroup({
      key: new FormControl(this.key, [Validators.required]),
      openId: new FormControl(this.authSvc.getOid(), [Validators.required]),
      money: new FormControl('', [Validators.required, Validators.min(100)]),
      tradePwd: new FormControl('', [Validators.required])
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

    if (this.withdrawForm.get('money').value % 10 !== 0) {
      this.dialogSvc.show({title: '温馨提示', content: '您的提现金额必需是100的倍数', cancel: '', confirm: '我知道了'}).subscribe();
      return false;
    }

    this.loading = true;
    this.toastSvc.loading('提取中');
    this.financeSvc.withdrawal(this.withdrawForm.value).subscribe(res => {
      this.toastSvc.hide();
      this.loading = false;
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

}

import {Component, OnInit} from '@angular/core';
import {LocationStrategy} from '@angular/common';
import {DialogService} from 'ngx-weui';
import {AuthService} from '../../auth/auth.service';
import {UserService} from '../../../@core/data/user.service';

@Component({
  selector: 'app-admin-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})

export class AdminWithdrawComponent implements OnInit {
  key = this.authSvc.getKey();
  user;

  constructor(private location: LocationStrategy,
              private dialogSvc: DialogService,
              private authSvc: AuthService,
              private userSvc: UserService) {
  }

  ngOnInit() {
    this.userSvc.get(this.key).subscribe(res => {
      this.user = res;
    });
  }

  withdraw() {
    if (this.user.amountMention <= 0) {
      this.dialogSvc.show({title: '', content: '可提现金额少于1元,无法提现！', cancel: '', confirm: '我知道了'}).subscribe();
    } else {
      this.dialogSvc.show({title: '', content: `您已成功提现${this.user.amountMention}元！`, cancel: '', confirm: '我知道了'}).subscribe(() => {
      });
    }
  }
}

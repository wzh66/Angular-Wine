import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {DialogService} from 'ngx-weui';
import {UserService} from '../../../@core/data/user.service';
import {LocationStrategy} from '@angular/common';
import {FooterService} from '../../../@theme/modules/footer/footer.service';

@Component({
  selector: 'app-admin-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class AdminFinanceComponent implements OnInit {
  key = this.authSvc.getKey();
  user;

  constructor(private location: LocationStrategy,
              private dialogSvc: DialogService,
              private footerSvc: FooterService,
              private authSvc: AuthService,
              private userSvc: UserService) {
    footerSvc.setActive(3);
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
      this.dialogSvc.show({
        title: '',
        content: `您已成功提现${this.user.amountMention}元！`,
        cancel: '',
        confirm: '我知道了'
      }).subscribe(() => {
      });
    }
  }

}

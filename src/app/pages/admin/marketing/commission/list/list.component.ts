import {Component, OnInit} from '@angular/core';
import {ShareService} from '../../../share/share.service';
import {AuthService} from '../../../../auth/auth.service';

@Component({
  selector: 'app-admin-marketing-commission-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminMarketingCommissionListComponent implements OnInit {
  key = this.authSvc.getKey();
  list = [];

  constructor(private shareSvc: ShareService, private authSvc: AuthService) {
    this.shareSvc.getList(this.key).subscribe(res => {
      this.list = res.list;
    });
  }

  ngOnInit() {
  }

}

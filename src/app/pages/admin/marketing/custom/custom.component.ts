import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {MarketingService} from '../marketing.service';

@Component({
  selector: 'app-admin-marketing-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class AdminMarketingCustomComponent implements OnInit {
  key = this.authSvc.getKey();
  customs = [];

  constructor(private authSvc: AuthService, private marketSvc: MarketingService) {
    this.marketSvc.getCustoms(this.key).subscribe(res => {
      this.customs = res.list;
    });
  }

  ngOnInit() {
  }

}

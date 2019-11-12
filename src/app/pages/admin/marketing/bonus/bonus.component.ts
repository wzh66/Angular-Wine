import {Component, OnInit} from '@angular/core';
import {MarketingService} from '../marketing.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-admin-marketing-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})
export class AdminMarketingBonusComponent implements OnInit {
  key = this.authSvc.getKey();
  bonus = [];

  constructor(private marketSvc: MarketingService,
              private authSvc: AuthService) {
    this.marketSvc.getReceives(this.key).subscribe(res => {
      this.bonus = res.list;
      console.log(this.bonus);
    });
  }

  ngOnInit() {
  }


}

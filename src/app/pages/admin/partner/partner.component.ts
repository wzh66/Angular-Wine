import {Component, OnInit} from '@angular/core';
import {PartnerService} from './partner.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class AdminPartnerComponent implements OnInit {
  partners = [];
  key = this.authSvc.getKey();
  bonus;

  constructor(private partnerSvc: PartnerService,
              private authSvc: AuthService) {
  }

  ngOnInit() {
    this.partnerSvc.get(this.key).subscribe(res => {
      this.partners = res.memberLevels;
      this.bonus = res.recevie;
      console.log(res);
    });
  }

}

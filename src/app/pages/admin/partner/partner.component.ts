import {Component, OnInit} from '@angular/core';
import {PartnerService} from './partner.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class AdminPartnerComponent implements OnInit {
  partners;

  constructor(private partnerSvc: PartnerService) {
  }

  ngOnInit() {
    this.partnerSvc.get().subscribe(res => {
      this.partners= res.memberLevels;
      console.log(this.partners);
    });
  }

}

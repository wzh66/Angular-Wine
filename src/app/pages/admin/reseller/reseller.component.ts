import {Component, OnInit} from '@angular/core';
import {FooterService} from '../../../@theme/modules/footer/footer.service';

@Component({
  selector: 'app-admin-reseller',
  templateUrl: './reseller.component.html',
  styleUrls: ['./reseller.component.scss']
})

export class AdminResellerComponent implements OnInit {
  constructor(private footerSvc: FooterService) {
    footerSvc.setActive(3);
  }

  ngOnInit() {
  }
}

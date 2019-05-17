import {Component, OnInit} from '@angular/core';
import {FooterService} from '../../../@theme/modules/footer/footer.service';

@Component({
  selector: 'app-admin-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})

export class AdminSellerComponent implements OnInit {
  constructor(private footerSvc: FooterService) {
    footerSvc.setActive(3);
  }

  ngOnInit() {
  }
}

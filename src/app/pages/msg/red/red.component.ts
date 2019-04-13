import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {SysService} from '../../../@core/data/sys.service';

@Component({
  selector: 'app-msg-red',
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.scss']
})
export class MsgRedComponent implements OnInit {
  web_host = window.location.origin;
  sysConfig;
  type;

  constructor(private route: ActivatedRoute,
              private sysSvc: SysService) {
  }

  ngOnInit() {
    this.type = this.route.snapshot.queryParams['type'];
    this.sysSvc.get().subscribe(res => {
      this.sysConfig = res;
    });
  }

}

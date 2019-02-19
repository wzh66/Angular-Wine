import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html'
})
export class AgreementComponent implements OnInit {

  constructor(private router: Router,
              private location: Location) {
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

}

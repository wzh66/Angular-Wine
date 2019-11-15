import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class AdminSearchComponent implements OnInit {
  searchKey: any;
  constructor(private route: ActivatedRoute) {
    this.searchKey = route.snapshot.queryParams.searchKey;
  }

  ngOnInit() {
  }
}

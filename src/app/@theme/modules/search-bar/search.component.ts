import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SearchService} from './search.service';
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  items: Observable<string[]>;
  value: string;

  constructor(private searchSvc: SearchService) {
  }

  ngOnInit() {
  }

  onSearch(word?: string) {
    this.searchSvc.search(word).subscribe(res => {
      this.value = word;
      if (word) {
        this.items = res.list;
        console.log(this.items);
      }
    });
  }

  onCancel() {
    console.log('onCancel');
  }

  onClear() {
    console.log('onCancel');
  }

  onSubmit(value: string) {
    console.log('onSubmit', value);
  }
}

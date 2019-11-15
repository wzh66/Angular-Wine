import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {SearchService} from './search.service';

import {CategoryService} from '../../../@core/data/category.service';

export interface SearchData {
  word: string;
  typeId: number;
  varId: number;
  categoryId: number;
  brandId: number;
  aromaId: number;
  placeId: number;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {
  @Input() word;
  items: Observable<string[]>;
  value: SearchData;

  constructor(private searchSvc: SearchService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['word']);
    if (changes['word'].currentValue) {
      this.onSearch(changes['word'].currentValue);
    }
  }

  onSearch(body: SearchData) {
    this.searchSvc.search(body).subscribe(res => {
      this.value = body;
      if (body) {
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

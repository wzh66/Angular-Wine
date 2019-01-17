import {Component, OnInit} from '@angular/core';

import {Contact, ContactService} from './contact.service';

@Component({
  selector: 'app-front-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class FrontItemComponent implements OnInit {
  item;
  persons;
  currentDetailType = 'profile';

  constructor(private contact: ContactService) {
    this.persons = this.contact.contacts;
    this.item = <any>{
      id: null,
      name: '',
      price: '',
      quantity: ''
    };
  }

  ngOnInit() {
  }

  setDefaultItem() {
    this.item = <any>{
      id: null,
      name: '',
      price: '',
      quantity: ''
    };
  }

  saveOrder(item) {
    this.goToList();
  }

  goToList() {
  }

  newItem(item) {
  }

  setActiveInput(detailType) {
  }

  onPanEvent(args, container) {
  }

  getSnapPosition(positionX: number, index?: number) {

    return 'position';
  }

  selectItemDetail(inputItem, selectedDetail) {
  }

  isSelected(name) {
    return name;
  }

  getSelectedPerson() {

    return 'person';
  }

  dismissSoftKeybaord() {
  }

  close() {
  }

}

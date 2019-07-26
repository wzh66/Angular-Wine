import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-footer-btn',
  templateUrl: './footer-btn.component.html',
  styleUrls: ['./footer-btn.component.scss']
})
export class FooterBtnComponent {
  @Input() title = '确定';
  @Input() loading = false;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<any>();

  constructor() {
  }

  onClick() {
    this.clicked.emit(this.loading || this.disabled ? false : true);
  }
}

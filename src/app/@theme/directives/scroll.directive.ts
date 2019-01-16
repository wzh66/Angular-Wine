import {Directive, HostListener, Input, ElementRef} from '@angular/core';
import {DirectionService} from '../animates/direction.service';

@Directive({
  selector: '[monitor]'
})
export class ScrollDirective {
  @Input() monitor = 'scroll'; // 输入属性，用于设置元素的背景颜色
  scrollTop = 0;

  constructor(private elementRef: ElementRef,
              private directionSvc: DirectionService) {
  }

  @HostListener('scroll')
  onMonitor() {
    const top = this.elementRef.nativeElement.scrollTop;
    let direction = '';
    if (top > this.scrollTop) {
      direction = 'down';
    } else {
      direction = 'up';
    }
    this.directionSvc.setScrollingStatus(direction);
    this.scrollTop = top;
  }
}

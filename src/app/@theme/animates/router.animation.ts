import {trigger, state, query, transition, animateChild, sequence, animate, style} from '@angular/animations';

export const RouterAnimation = trigger('routerAnimation', [
  transition('* => *', [
    sequence([
      query(':leave', [
        animateChild({delay: '0.4s'})
      ], {optional: true}),
      query(':enter', [
        animateChild({delay: '0.4s'})
      ], {optional: true})
    ])
  ]),
]);

export const Slide = trigger('slide', [

  transition('void => right', [
    style({transform: 'translate3d(-100%,0,0) '}),
    animate('0.4s ease-in-out', style({transform: 'translate3d(0,0,0)'}))
  ]),

  transition('right => void', [
    style({opacity: 1}),
    animate('0.4s ease-in-out', style({opacity: 0}))
  ]),

  transition('void => left', [
    style({transform: 'translate3d(100%,0,0) '}),
    animate('0.4s ease-in-out')
  ]),

  transition('left => void', [
    style({opacity: 1}),
    animate('0.4s ease-in-out', style({opacity: 0}))
  ])
]);

export const animations: any[] = [RouterAnimation, Slide];

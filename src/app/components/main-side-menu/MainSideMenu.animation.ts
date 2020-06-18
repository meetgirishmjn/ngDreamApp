import { trigger, state, style, transition, animate, animateChild, query, stagger } from '@angular/animations';


export const onSideNavChange = trigger('onSideNavChange', [
  state('close',
    style({
      'min-width': '64px'
    })
  ),
  state('open',
    style({
      'min-width': '240px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);


export const onMainContentChange = trigger('onMainContentChange', [
  state('close',
    style({
      'margin-left': '62px'
    })
  ),
  state('open',
    style({
      'margin-left': '200px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);


export const animateText = trigger('animateText', [
  state('hide',
    style({
      'display': 'none',
      opacity: 0,
    })
  ),
  state('show',
    style({
      'display': 'block',
      opacity: 1,
    })
  ),
  transition('close => open', animate('350ms ease-in')),
  transition('open => close', animate('200ms ease-out')),
]);

export const listAnimation = trigger('listAnimation', [
    transition('* => *', [ // each time the binding value changes
        query(':leave', [
            stagger(100, [
                animate('0.1s', style({ opacity: 0 }))
            ])
        ], { optional: true }),
        query(':enter', [
            style({ opacity: 0 }),
            stagger(100, [
                animate('0.1s', style({ opacity: 1 }))
            ])
        ], { optional: true })
    ])
])

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const BANNERENTER =
  trigger('animacao-banner', [
    state('criado', style({
      opacity: 1
    })),
    transition('void => criado', [
      style({
        opacity: 0,
        transform: 'translate(-50px, 0)'
      }),
      animate('500ms 0s ease-in-out') //duração, delay, aceleração(easein)
    ])
  ])

export const BANNERIMG =
    trigger('banner', [
      state('escondido', style({
        display: 'none'
      })),
      state('visivel', style({
        display: 'block'
      })),
      transition('escondido <=> visivel', animate('2s ease-in'))
    ])

export const PANELANIMATION =
  trigger('animacao-painel',[
    state('criado', style({
      opacity: 1
    })),
  transition('void => criado', [
  style({
      opacity: 0,
      transform: 'translate(50px, 0)'
  }),
  // 0 void -----x------------------------x----x--x------- 1.5s ----- x criado -->>>>>> temos uma animação sem delay
  animate('1.5s 0s ease-in-out',
  keyframes([
    style({
      offset: 0.15, // valor definido pela porcentagem com base na duração
      opacity: 1,
      transform: 'translateX(0)'
    }),
    style({
      offset: 0.86,
      opacity: 1,
      transform: 'translateX(0)'
    }),
    style({
      offset: 0.88,
      opacity: 1,
      transform: 'translateY(-10px)'
    }),
    style({
      offset: 0.90,
      opacity: 1,
      transform: 'translateY(10px)'
    }),
    style({
      offset: 0.92,
      opacity: 1,
      transform: 'translateY(-10px)'
    }),
    style({
      offset: 0.95,
      opacity: 1,
      transform: 'translateY(10px)'
    })
  ]))
  ])
  ])


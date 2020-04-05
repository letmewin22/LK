import { TimelineMax, Power2, Expo } from 'gsap'

import { TextSplit } from '../helpers.js'

export default class Button {

  constructor(btn) {

    this.btn = btn

    TextSplit(document.querySelectorAll('.button-text'), 'chars')

    this.btn.forEach(elem => elem.addEventListener('mouseenter', this.hover))
    this.btn.forEach(elem => elem.addEventListener('mouseleave', this.hoverOut))
  }

  hover() {
    
    const btnRewealer = this.querySelector('.button-rewealer')
    const btnText = btnRewealer.querySelector('.button-text')
    const btnTextChars = [...btnText.querySelectorAll('.char')]

    let tl = new TimelineMax()
    tl
      .to(btnRewealer, 0.5, { scale: 1, y: '-50%', x: '-50%', ease: Power2.easeOut })
      .to(this, 0.5, { rotation: 0, ease: Power2.easeOut }, 0)
      .staggerTo(btnTextChars, 0.5, { y: 0, opacity: 1, ease: Expo.easeOut }, 0.03, 0.2)

  }

  hoverOut() {

    const btnRewealer = this.querySelector('.button-rewealer')
    const btnText = btnRewealer.querySelector('.button-text')
    const btnTextChars = [...btnText.querySelectorAll('.char')]

    let tl = new TimelineMax()
    tl
      .staggerTo(btnTextChars, 0.5, { y: 30, opacity: 0, ease: Expo.easeOut }, 0.03)
      .to(btnRewealer, 0.5, { scale: 0, y: '-50%', x: '-50%', ease: Power2.easeOut }, 0.2)
      .to(this, 0.5, { rotation: -10, ease: Power2.easeOut }, 0.2)
  }

}

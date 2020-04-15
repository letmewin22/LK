import { TimelineMax, Power1, Power3, Expo, Back } from 'gsap'

export default class FormAnimations {

  static open(form, elem) {

    const size = window.innerWidth > window.innerHeight ? window.innerWidth * 2.2 : window.innerHeight * 2.5
    const tl = new TimelineMax()
    tl
      .to(elem.querySelector('.form-bg'), 1.1, { width: size, height: size, left: 0, ease: Power3.easeInOut })
      .to(elem.querySelector('.form-bg'), 1.1, { backgroundColor: '#f1f1f1', ease: Power1.easeInOut }, 0)
      .to(elem.querySelector('.form-bg'), 0.01, { position: 'fixed' }, 0)
      .to(elem, 0.01, { zIndex: 1000, ease: Power1.easeInOut }, 0)
      .to(form, 0.5, { display: 'flex', opacity: 1, ease: Power1.easeOut }, 0.8)
  }

  static close(elems, callback) {

    const tl = new TimelineMax({ onComplete: () => callback })
    tl
      .to(elems.inputWrapper, 1, { opacity: 0, y: '5vh', ease: Expo.easeOut }, 0)
      .to(elems.formH, 1, { opacity: 0, y: '5vh', ease: Expo.easeOut }, 0.2)
      .to(elems.form, 0.5, { opacity: 0, ease: Power1.easeOut }, 0)
      .to(document.querySelectorAll('.form-bg'), 1.1, { width: 0, height: 0, left: '50%', ease: Expo.easeOut }, 0.8)
      .to(document.querySelectorAll('.form-bg'), 1.1, { backgroundColor: '#9c27b0', ease: Expo.easeOut }, 0.8)
      .to(elems.form, 0.1, { display: 'none', ease: Power1.easeOut }, 1.8)
      .to(document.querySelectorAll('.form-handler'), 0.01, { zIndex: 'auto', ease: Power1.easeInOut })
      .to(document.querySelectorAll('.form-bg'), 0.01, { position: 'absolute', ease: Power1.easeInOut })
  }

  static screens(allElems, curElem) {

    const tl = new TimelineMax()
    tl
      .to(allElems.querySelector('.form-h2'), 0.7, { opacity: 0, y: '5vh', ease: Expo.easeOut }, 0.2)
      .to(allElems.querySelectorAll('.input-wrapper'), 0.7, { opacity: 0, y: '5vh', ease: Expo.easeOut }, 0)
      .to(curElem.querySelector('.form-h2'), 1, { opacity: 1, y: 0, ease: Expo.easeOut }, 0.5)
      .to(curElem.querySelectorAll('.input-wrapper'), 1, { opacity: 1, y: 0, ease: Expo.easeOut }, 0.7)

  }

  static thankYou(screen, text) {

    const tl = new TimelineMax()
    tl
      .to(screen, 0.5, { opacity: 1, ease: Expo.easeInOut })
      .to(text, 1.5, { opacity: 1, y: 0, ease: Expo.easeInOut }, 0.1)
      .to(text, 1.5, { opacity: 0, y: '5vh', ease: Expo.easeInOut}, 3)
      .to(screen, 0.5, { opacity: 0, ease: Expo.easeInOut }, 4)
  }

  static counter(elem, callback) {

    const tl = new TimelineMax()
    tl
      .to(elem, 0.4, {y: '-100%', opacity: 0, ease: Back.easeIn, onComplete: callback})
      .to(elem, 0, {y: '100%'})
      .to(elem, 0.8, { y: '0%', opacity: 1, ease: Power3.easeInOut })
  }
}

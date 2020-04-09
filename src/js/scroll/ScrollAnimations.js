import ScrollInView from './ScrollInView.js'
import { TimelineMax, Power1, Power2, Power3 } from 'gsap'
import { splitLines } from '../helpers.js'

class ScrollAnimations extends ScrollInView {

  constructor() {

    super()

    this.sections = document.querySelectorAll('.section')
    this.footer = document.querySelectorAll('footer')
    this.cases = document.querySelectorAll('.case')

    new ScrollInView(this.sections, this.sectionAnimation)
    new ScrollInView(this.footer, this.footerAnimation)
    new ScrollInView(this.cases, this.casesAnimation)
  }

  sectionAnimation(elem) {
    const tl = new TimelineMax()
    tl
      .to(elem.querySelectorAll('.heading-line'), 1, { width: '100%', ease: Power1.easeInOut }, 0)
      .to(elem.querySelectorAll('h2'), 0.8, { opacity: 1, y: 0, ease: Power1.easeOut }, 0.5)
      .to(elem.querySelectorAll('.about-text'), 0.8, { opacity: 1, ease: Power1.easeOut }, 0.4)
      .staggerTo(elem.querySelectorAll('.award__line'), 1.3, { width: '100%', ease: Power2.easeOut }, 0.2, 0.5)
      .staggerTo(elem.querySelectorAll('.award__content .animating'), 0.6, { y: '0%', opacity: 1, ease: Power2.easeOut }, 0.1, 0.5)

    ScrollAnimations.aboutTextLines(elem)

  }

  casesAnimation(elem) {
    const tl = new TimelineMax()
    tl
      .to(elem.querySelectorAll('h4'), 0.8, { opacity: 1, y: 0, ease: Power1.easeOut }, 0.1)
      .to(elem.querySelectorAll('.case-num'), 0.8, { opacity: 0.7, y: 0, ease: Power1.easeOut }, 0.1)
  }

  footerAnimation(elem) {

    const tl = new TimelineMax()
    tl
      .to(elem.querySelectorAll('h2'), 0.8, { opacity: 1, y: 0, ease: Power1.easeOut }, 0)
      .to(elem.querySelectorAll('h3'), 0.8, { opacity: 1, y: 0, ease: Power1.easeOut }, 0.2)
      .to(elem.querySelectorAll('.button'), 1, { opacity: 1, ease: Power1.easeInOut }, 0.2)
      .to(elem.querySelectorAll('.contact-me'), 1, { opacity: 1, ease: Power1.easeInOut }, 0.4)
      .staggerTo(elem.querySelectorAll('.contacts-line'), 0.8, { width: '100%', ease: Power1.easeInOut }, 0.3, 0.2)
      .staggerTo([elem.querySelectorAll('.contacts .footer-animate')[0], elem.querySelectorAll('.contacts .footer-animate')[1], elem.querySelectorAll('.contacts .footer-animate')[2]], 0.8, { opacity: 1, y: 0, ease: Power2.easeOut }, 0.3, 0.1)
      .staggerTo([elem.querySelectorAll('.contacts .footer-animate')[3], elem.querySelectorAll('.contacts .footer-animate')[4], elem.querySelectorAll('.contacts .footer-animate')[5]], 0.8, { opacity: 1, y: 0, ease: Power2.easeOut }, 0.3, 0.1)
  }

  static aboutTextLines(elem) {

    const allP = elem.querySelectorAll('.about-text p')

    allP.forEach(p => {
      let blah = splitLines(p)

      blah.forEach(function(element) {
        let tl = new TimelineMax()
        tl
          .staggerTo(element, 1.3, { y: '0%', ease: Power3.easeOut }, 0.15, 0.4)
          .staggerTo(element, 1.3, { opacity: 1, ease: Power3.easeOut }, 0.17, 0.5)
      })
    })
  }

}

export default ScrollAnimations

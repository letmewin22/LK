import { TimelineMax, Power3 } from 'gsap'
import Highway from '@dogstudio/highway'


export default class CircleTransition extends Highway.Transition {
  // Built-in methods
  out({ done }) {

    document.body.style.pointerEvents = 'none'
    document.body.style.overflow = 'hidden'
    const pageRewealer = document.querySelector('.page-rewealer')
    const size = window.innerWidth > window.innerHeight ? '300vw' : '300vh'

    const tl = new TimelineMax({ onComplete: done })

    tl
      .to(pageRewealer, 1.5, { width: size, height: size, ease: Power3.easeInOut })
      .to(pageRewealer, 0, { right: 'auto', left: 0, x: '-50%', top: 0, bottom: 'auto', y: '-50%'})
  }

  in({ from, done }) {

    from.remove()

    window.scrollTo(0, 0)
    document.querySelector('.site-wrapper').scrollTo(0, 0)
    const pageRewealer = document.querySelector('.page-rewealer')
    const tl = new TimelineMax({
      onComplete: () => {
        document.body.style.pointerEvents = 'auto'
        done()
      }
    })
    tl
      .to(pageRewealer, 0, { width: '0vw', height: '0vw'})
      .to(pageRewealer, 0, { left: 'auto', right: 0, x: '50%', top: 'auto', bottom: 0, y: '50%'})


  }
};

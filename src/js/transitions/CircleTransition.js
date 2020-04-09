import { TimelineMax, Power3 } from 'gsap'
import Highway from '@dogstudio/highway'


export default class CircleTransition extends Highway.Transition {
  // Built-in methods
  out({ done }) {

    document.body.style.pointerEvents = 'none'
    document.body.style.overflow = 'hidden'

    const tl = new TimelineMax({ onComplete: done })

    tl
      .fromTo(document.querySelector('.page-rewealer'), 1.2, { width: '0vw', height: '0vw' }, { width: '200vw', height: '200vw', ease: Power3.easeInOut })
      .to(document.querySelector('.page-rewealer'), 1.2, {backgroundColor: '#131217', ease: Power3.easeInOut}, 0.3)

  }

  in({ from, done }) {

    from.remove()

    window.scrollTo(0, 0)

    const tl = new TimelineMax({
      onComplete: () => {
        document.body.style.pointerEvents = 'auto'
        done()
      }
    })
    tl
      .fromTo(document.querySelector('.page-rewealer'), 0, { width: '200vw', height: '200vw' }, { width: '0vw', height: '0vw', backgroundColor: '#f1f1f1', ease: Power3.easeInOut })


  }
};

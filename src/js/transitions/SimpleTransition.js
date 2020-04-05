import { TimelineMax, Power3 } from 'gsap'
import Highway from '@dogstudio/highway'

export default class Fade extends Highway.Transition {
  // Built-in methods
  out({ from, done }) {
    let tl = new TimelineMax({ onComplete: done })
    document.body.style.pointerEvents = 'none'
    document.body.style.overflow = 'hidden'
    tl
      .to(from, 0.4, { opacity: 0, ease: Power3.easeInOut })

  }

  in({ from, to, done }) {
    from.remove()
    window.scrollTo(0, 0)
    let tl = new TimelineMax({
      onComplete: () => {
        document.body.style.pointerEvents = 'auto'
        done()
      }
    })
    tl
      .fromTo(to, 0.4, { opacity: 0 }, { opacity: 1, ease: Power3.easeInOut })

  }
};

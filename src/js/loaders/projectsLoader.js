import { TimelineMax, Power1 } from 'gsap'
import ParallaxScroller from '../ParallaxScroller'

const projectsLoader = () => {
  const textLines = screen.width > 460 ? document.querySelectorAll('h1 span') : document.querySelectorAll('h1')
  const cases = [document.querySelector('.cases'), document.querySelector('#app')]
  const scrollDown = document.querySelector('.scroll-down')

  let tl = new TimelineMax({
    onComplete: () => {
      new ParallaxScroller('.h1-line')
      document.body.style.overflow = 'initial'
    }
  })
  tl
    .staggerTo(textLines, 1.3, { y: 0, ease: Power3.easeOut }, 0.15, 0)
    .staggerTo(textLines, 1.3, { opacity: 1, ease: Power3.easeOut }, 0.17, 0.1)
    .to(cases, 0.8, { opacity: 1, ease: Power1.easeOut }, 1)
    .to(scrollDown, 0.8, { opacity: 1, ease: Power1.easeOut }, 1)

}

export default projectsLoader

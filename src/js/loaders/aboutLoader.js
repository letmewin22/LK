import { TimelineMax, Power1, Power3 } from 'gsap'
import ParallaxScroller from '../ParallaxScroller'

const aboutLoader = () => {
  const textLines = screen.width > 460 ? document.querySelectorAll('h1 span') : document.querySelectorAll('h1')
  const repeatedLines = document.querySelectorAll('.repeated-text__line')
  const repeatedText = document.querySelector('.repeated-text--about')
  const cases = [document.querySelector('.cases'), document.querySelector('#app')]
  let tl = new TimelineMax({onComplete: () => {
  	new ParallaxScroller('.h1-line')
  	document.body.style.overflow = 'initial'
  }})
  tl
    .staggerTo(textLines, 1.3, { y: 0, ease: Power3.easeOut }, 0.15, 0)
    .staggerTo(textLines, 1.3, { opacity: 1, ease: Power3.easeOut }, 0.17, 0.1)
    .to(repeatedLines, 1.6, { scaleX: 1, ease: Power3.easeInOut }, 0.3)
    .to(repeatedText, 1, { opacity: 1, ease: Power1.easeOut }, 1)
    .to(cases, 1, { opacity: 1, ease: Power3.easeOut }, 0.3)
}

export default aboutLoader

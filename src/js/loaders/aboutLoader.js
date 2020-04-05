import { TimelineMax, Power1, Power3 } from 'gsap'
import ParallaxScroller from '../ParallaxScroller'

const aboutLoader = () => {
  const textLines = document.querySelectorAll('h1 span')
  const repeatedLines = document.querySelectorAll('.repeated-text__line')
  const repeatedText = document.querySelector('.repeated-text--about')
  let tl = new TimelineMax({onComplete: () => {
  	new ParallaxScroller('.h1-line')
  	document.body.style.overflow = 'initial'
  }})
  tl
    .staggerTo(textLines, 1.3, { y: 0, ease: Power3.easeOut }, 0.15, 0.4)
    .staggerTo(textLines, 1.3, { opacity: 1, ease: Power3.easeOut }, 0.17, 0.5)
    .to(repeatedLines, 1.6, { scaleX: 1, ease: Power3.easeInOut }, 0.8)
    .to(repeatedText, 1, { opacity: 1, ease: Power1.easeOut }, 1.5)
}

export default aboutLoader

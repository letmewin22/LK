import { TimelineMax, Power3 } from 'gsap'
import ParallaxScroller from '../ParallaxScroller'

const mainLoader = () => {
  const btn = document.querySelector('.button')
  const textLines = document.querySelectorAll('h1 span')
  const social = document.querySelectorAll('.social')
  let tl = new TimelineMax({onComplete: () => {
  	new ParallaxScroller('.h1-line')
  	document.body.style.overflow = 'initial'
  }})
  tl
    .staggerTo(textLines, 1.3, { y: 0, ease: Power3.easeOut }, 0.15, 0.4)
    .staggerTo(textLines, 1.3, { opacity: 1, ease: Power3.easeOut }, 0.17, 0.5)
    .to(btn, 1, { opacity: 1, rotation: -10, ease: Power3.easeOut }, 0.8)
    .to(social, 1, { opacity: 1, y: 0, ease: Power3.easeOut }, 0.8)

}

export default mainLoader

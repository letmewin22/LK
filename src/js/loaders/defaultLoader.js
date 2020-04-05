import { TimelineMax, Power1 } from 'gsap'

const defaultLoader = (callback) => {

  let tl = new TimelineMax({onComplete: () => {
  	callback()
  	document.body.style.pointerEvents = 'auto'
  }})
  tl
    .to(document.body, 0.5, { opacity: 1, ease: Power1.easeInOut }, 0.5)
}

export default defaultLoader

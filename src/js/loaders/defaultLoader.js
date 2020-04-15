import { TimelineMax, Power1 } from 'gsap'

const defaultLoader = (callback) => {
  const loader = document.querySelector('.page-loader')
  let tl = new TimelineMax({onComplete: () => {
  	callback()
    document.body.style.pointerEvents = 'auto'
  	document.body.removeChild(loader)
  }})
  tl
    .to(loader, 1, { opacity: 0, pointerEvents: 'none', ease: Power1.easeInOut }, 1)
}

export default defaultLoader

import { TimelineMax, Power1 } from 'gsap'

const projectsLoader = () => {
  const h2 = document.querySelector('h2')
  const h4 = document.querySelectorAll('h4')
  const h2Line = document.querySelector('.heading-line')
  const cases = [document.querySelector('.cases'), document.querySelector('#app')]

  let tl = new TimelineMax({
    onComplete: () => {
      document.body.style.overflow = 'initial'
    }
  })
  tl
    .to(h2Line, 1, { width: '100%', ease: Power1.easeInOut }, 0.2)
    .to(h2, 0.8, { opacity: 1, y: 0, ease: Power1.easeOut }, 0.7)
    .staggerTo(h4, 0.8, { opacity: 1, y: 0, ease: Power1.easeOut }, 0.5, 0.3)
    .staggerTo(cases, 0.8, { opacity: 1, ease: Power1.easeOut }, 0.5, 0.3)

}

export default projectsLoader

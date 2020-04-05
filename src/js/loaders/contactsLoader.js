import { TimelineMax, Power1, Power2 } from 'gsap'


const contactsLoader = () => {
  
  const h2 = document.querySelector('h2')
  const h3 = document.querySelectorAll('h3')
  const btn = document.querySelector('.button')
  const contactMe = document.querySelector('.contact-me')
  const lines = document.querySelectorAll('.contacts-line')
  const links = document.querySelectorAll('.contacts .footer-animate')

  const tl = new TimelineMax({onComplete: () => {
  	document.body.style.overflow = 'initial'
  }})

  tl
    .delay(1)
    .to(h2, 0.8, { opacity: 1, y: 0, ease: Power1.easeOut }, 0)
    .to(h3, 0.8, { opacity: 1, y: 0, ease: Power1.easeOut }, 0.2)
    .to(btn, 1, { opacity: 1, ease: Power1.easeInOut }, 0.2)
    .to(contactMe, 1, { opacity: 1, ease: Power1.easeInOut }, 0.4)
    .staggerTo(lines, 0.8, { width: '100%', ease: Power1.easeInOut }, 0.3, 0.2)
    .staggerTo([links[0], links[1], links[2]], 0.8, { opacity: 1, y: 0, ease: Power2.easeOut }, 0.3, 0.1)
    .staggerTo([links[3], links[4], links[5]], 0.8, { opacity: 1, y: 0, ease: Power2.easeOut }, 0.3, 0.1)


}

export default contactsLoader

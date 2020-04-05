import { TimelineMax, Power2, Power3 } from 'gsap'

export default class Nav {

  constructor(nav, burger) {

    this.nav = nav
    this.burger = burger

    this.burgerLines = this.burger.querySelectorAll('.burger__line')
    this.navItems = this.nav.querySelectorAll('li')

    this.logo = document.querySelector('.logo')

    this.burger.addEventListener('click', this.events.bind(this))
    this.navItems.forEach(elem => elem.addEventListener('click', this.events.bind(this)))

  }

  events() {

    this.nav.style.display === 'flex' ? this.close() : this.open()
  }

  open() {

    this.openAnim()
    this.logo.style.color = 'black'

    for (let line of this.burgerLines) {
      line.style.background = 'black'
    }

    this.burger.classList.add('active')

  }

  close() {

    this.closeAnim()
    this.logo.style.color = 'white'

    for (let line of this.burgerLines) {
      line.style.background = 'white'
    }

    this.burger.classList.remove('active')
  }

  openAnim() {

    const tl = new TimelineMax()

    tl
      .to(this.nav, 0.01, { display: 'flex' })
      .fromTo(this.nav, 1, { y: '-100%', borderRadius: '50%' }, { y: '0%', borderRadius: '0%', ease: Power3.easeInOut }, 0)
      .staggerFromTo(this.navItems, 1, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: Power3.easeOut }, 0.2, 0.75)
  }

  closeAnim() {

    const tl = new TimelineMax()

    tl
      .staggerFromTo(this.navItems, 0.6, { y: 0, opacity: 1 }, { y: -60, opacity: 0, ease: Power2.easeIn }, 0.05)
      .fromTo(this.nav, 1, { y: '0%', borderRadius: '0%' }, { y: '-100%', borderRadius: '50%', ease: Power3.easeInOut }, 0.5)
      .to(this.nav, 0.01, { display: 'none' })
  }
}

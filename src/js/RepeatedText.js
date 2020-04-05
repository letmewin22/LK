import { TimelineMax, Linear } from 'gsap'

export default class RepeatedText {

  constructor(options) {

    this.lineTop = options.lineTop || null
    this.lineBottom = options.lineBottom || null
    this.time = options.time || 15

  }

  oneLine() {

    let tl = new TimelineMax({ repeat: -1 })
    tl
      .to(this.lineTop, this.time, { x: '-50%', ease: Linear.easeNone })
      .to(this.lineTop, 0, { x: '0%' }, this.time)
  }

  twoLines() {

    let tl = new TimelineMax({ repeat: -1 })
    tl
      .to(this.lineTop, this.time, { x: '-50%', ease: Linear.easeNone })
      .to(this.lineBottom, this.time, { x: '50%', ease: Linear.easeNone }, 0)
      .to(this.lineTop, 0, { x: '0%' }, this.time)
      .to(this.lineBottom, 0, { x: '0%' }, this.time)

  }
}

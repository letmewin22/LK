import { TweenLite, Elastic, Power1 } from 'gsap'

export default class CustomCursor {

  constructor(cursor, imgs) {

    this.cursor = cursor
    this.hoveredImgs = imgs

    this.hoveredImgs.forEach(elem => elem.addEventListener('mouseenter', () => this.hover()))
    this.hoveredImgs.forEach(elem => elem.addEventListener('mouseleave', () => this.hoverOut()))

    this.eventFunc = (e) => {
      this.moveCircle(e)
    }
  }

  moveCircle(e) {
    TweenLite.to(this.cursor, 0.01, {
      css: {
        left: e.clientX,
        top: e.clientY
      }
    })
  }

  hover() {

    TweenLite.to(this.cursor, 1, { scale: 1, ease: Elastic.easeOut.config(1, 0.75) })
    document.body.addEventListener('mousemove', this.eventFunc)
  }

  hoverOut() {

    TweenLite.to(this.cursor, 0.3, { scale: 0, ease: Power1.easeOut })
    document.body.removeEventListener('mousemove', this.eventFunc)

  }

}

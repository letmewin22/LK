import { TweenLite } from 'gsap'

class MousemoveParallax {

  constructor(options) {

    this.img = options.img || console.error("There isn't img")
    this.target = options.target || console.error("There isn't target")
    this.effect = options.effect || 50
    this.rotation = options.rotation || true

    this.target.addEventListener('mouseenter', this.mouseOn.bind(this))
    this.target.addEventListener('mouseleave', this.mouseOut.bind(this))

    this.eventFunc = (e) => {
      this.moveMouse(e)
    }
  }

  moveMouse(e) {

    const targetX = this.target.getBoundingClientRect().x
    const targetWidth = this.target.getBoundingClientRect().width

    TweenLite.to(this.img, 0.5, {
      css: {
        x: e.pageX,
        y: e.pageY,
        rotation: this.rotation ? (targetX + targetWidth / 2 - e.pageX) / this.effect : 0
      }
    })
  }

  mouseOn() {

    TweenLite.to(this.img, 0.3, { scale: 1, autoAlpha: 1 })
    this.target.addEventListener('mousemove', this.eventFunc)
  }

  mouseOut() {

    TweenLite.to(this.img, 0.3, { scale: 0.1, autoAlpha: 0 })
    this.target.removeEventListener('mousemove', this.eventFunc)
  }
}

export default MousemoveParallax

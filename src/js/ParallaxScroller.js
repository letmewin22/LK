export default class ParallaxScroller {

  constructor(selector, speedIndex) {

    this.speed = [speedIndex || 5, 6, 12, 7]
    this.layer = document.querySelectorAll(selector)

    this.newPixel = window.pageYOffset

    if (screen.width > 1024) {
      this.looper()
      this.scroller()
      window.requestAnimationFrame(() => new ParallaxScroller(selector, speedIndex))
    }

  }

  looper() {

    if (this.newPixel > 0) {

      for (let i = 0; i < this.layer.length; i++) {

        (i + 1) % 2 === 0 ?
          this.layer[i].style.transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,-${this.newPixel*0.011*this.speed[i]},0,0,1)` :
          this.layer[i].style.transform = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,${this.newPixel*0.025*this.speed[i]},0,0,1)`

      }
    }

  }

  scroller() {
    if (document.querySelector('.scroll-down')) {
      if (this.newPixel > 0) {
        document.querySelector('.scroll-down__bottom').style.animationDuration = `${20 + (this.newPixel*0.025)}s`
      }
    }
  }
}

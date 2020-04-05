export default class ScrollInView {

  constructor(elements, callback) {

    this.elements = elements || []
    this.callback = callback

    this.intersectionRatio = 0.5

    this.inView()

    window.requestAnimationFrame(() => new ScrollInView(elements, callback))
  }

  inView() {

    this.elements.forEach(elem => {

      let elemTop = elem.getBoundingClientRect().top

      if (elemTop <= window.innerHeight * this.intersectionRatio && elemTop > 0) {
        if (!elem.classList.contains('activated')) {

          elem.classList.add('activated')
          this.callback(elem)
        }
      }
    })
  }
}

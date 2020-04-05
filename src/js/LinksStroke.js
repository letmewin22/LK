export default class LinkStroke {

  static strokeSize() {

    const strokeSvg = this.querySelector('svg')
    const strokeLink = this.querySelector('.stroke-link')

    const strokeSize = {
      width: +strokeLink.getAttribute('data-width'),
      height: +strokeLink.getAttribute('data-height')
    } 

    strokeLink.getBoundingClientRect().width
    strokeSvg.setAttribute('width', `${strokeLink.getBoundingClientRect().width + strokeSize.width}px`)
    strokeSvg.setAttribute('height', `${strokeLink.getBoundingClientRect().height+ strokeSize.height}px`)
  }

  static strokeOn() {

    const strokeSvg = this.querySelector('svg')
    const strokeSvgPath = strokeSvg.querySelector('path')

    strokeSvgPath.classList.add('stroked')
    strokeSvgPath.style.strokeDasharray = strokeSvgPath.getTotalLength()
  }

  static strokeOut() {

    const strokeSvg = this.querySelector('svg')
    const strokeSvgPath = strokeSvg.querySelector('path')

    strokeSvgPath.style.strokeDashoffset = strokeSvgPath.getTotalLength()
    strokeSvgPath.style.strokeDasharray = strokeSvgPath.getTotalLength()
    strokeSvgPath.classList.remove('stroked')
  }

  static strokeSvgEvents() {

    const strokeSvgWrap = document.querySelectorAll('.stroke-a')

    strokeSvgWrap.forEach(elem => this.strokeOut.bind(elem)())
    strokeSvgWrap.forEach(elem => this.strokeSize.bind(elem)())
    
    strokeSvgWrap.forEach(elem => elem.addEventListener('mouseenter', this.strokeOn))
    strokeSvgWrap.forEach(elem => elem.addEventListener('mouseleave', this.strokeOut))
  }
}

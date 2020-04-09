import { insertParam, getQueryParams } from './links'
import HTML from './HTML'
import Player from './Player'
import CasesAnimations from './CasesAnimations'

export default class Cases {

  constructor() {

    this.cases = document.querySelectorAll('.cursor-active')
    this.wrapper = document.querySelector('.pop-up-wrapper')

    this.currentLink()
    this.clickHandler()

  }

  currentLink() {

    const link = getQueryParams()
    if (link['video']) {

      this.cases.forEach((elem, index) => {

        if (+link['video'] === (index + 1)) {
          this.wrapper.innerHTML = HTML.markup(index)

          const ca = new CasesAnimations
          ca.openAnimation()
        }
      })

      this.wrapper.querySelector('.close-pop-up').addEventListener('click', () => {

        const callback = () => {
          this.wrapper.innerHTML = ''
          history.pushState(null, null, window.location.pathname)
        }
        const ca = new CasesAnimations
        ca.closeAnimation(callback)
      })

      new Player()

      const casesInfo = document.querySelector('.case-info')
      const videoPlayer = document.querySelector('.video-player')

      casesInfo.style.width = videoPlayer.getBoundingClientRect().width + 'px'

      window.addEventListener('resize', () => {
        casesInfo.style.width = videoPlayer.getBoundingClientRect().width + 'px'
      })

    }
  }

  clickHandler() {

    this.cases.forEach((elem, index) => {

      elem.addEventListener('click', () => {

        history.pushState(null, null, window.location.pathname)
        insertParam('video', index + 1)

        this.currentLink()
      })
    })
  }

}

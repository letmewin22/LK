import { insertParam, getQueryParams } from './links'
import { navLinksDetect } from '../helpers.js'
import HTML from './HTML'
import Player from './Player/Player'

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
          document.body.style.overflow = 'hidden'
        }
      })

      const player = new Player()

      this.wrapper.querySelector('.close-pop-up').addEventListener('click', () => {
        player.pause()
        player.removeSpaceEvent()
        
        const callback = () => {
          this.wrapper.innerHTML = ''
          history.pushState(null, null, window.location.pathname)
          navLinksDetect()
          document.body.style.overflow = 'initial'
        }
        const ca = new CasesAnimations
        ca.closeAnimation(callback)
      })



      const casesInfo = document.querySelector('.case-info')
      const videoPlayer = document.querySelector('.video-player')

      casesInfo.style.width = videoPlayer.getBoundingClientRect().width + 'px'

      const updateSize = () => {
        casesInfo.style.width = videoPlayer.getBoundingClientRect().width + 'px'
        window.requestAnimationFrame(updateSize)
      }

      updateSize()


    }
  }

  clickHandler() {

    this.cases.forEach((elem, index) => {

      elem.addEventListener('click', () => {

        insertParam('video', index + 1)

        this.currentLink()
      })
    })
  }

}

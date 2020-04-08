import { insertParam, getQueryParams } from './links'
import HTML from './HTML'
import Player from './Player'

export default class Cases {

  constructor() {

    this.cases = document.querySelectorAll('.cursor-active')

    this.currentLink()
    this.clickHandler()
  }

  currentLink() {

    const link = getQueryParams()
    if (link['video']) {

      this.cases.forEach((elem, index) => {

        if (+link['video'] === (index + 1)) {
          document.querySelector('.pop-up-wrapper').innerHTML = HTML.markup(index + 1)
        }
      })

      document.querySelector('.pop-up-wrapper').querySelector('.close-pop-up').onclick = () => {
        document.querySelector('.pop-up-wrapper').innerHTML = ''
        history.pushState(null, null, window.location.pathname)
      }
      new Player()
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

import { TimelineMax } from 'gsap'

export default class CasesAnimations {

  constructor() {

    this.popUpBg = document.querySelector('.pop-up-bg')
    this.cursor = document.querySelector('.cursor')
    this.cursorPos = this.cursor.getBoundingClientRect()

    this.caseName = document.querySelector('.case-name')
    this.caseLink = document.querySelector('.case-link')
    this.videoPlayer = document.querySelector('.video-player')

    this.popUpBg.style.left = this.cursorPos.x !== 0 ? (this.cursorPos.x + this.cursorPos.width / 2) + 'px' : window.innerWidth / 2 + 'px'
    this.popUpBg.style.top = this.cursorPos.y !== 0 ? (this.cursorPos.y + this.cursorPos.height / 2) + 'px' : window.innerHeight / 2 + 'px'
    this.popUpBg.style.opacity = 1
  }

  openAnimation() {

    const tl = new TimelineMax()

    tl
      .to(this.popUpBg, 1.3, { width: '240vw', height: '240vw', ease: Power3.easeInOut })
      .to(this.popUpBg, 1.1, { backgroundColor: '#f1f1f1', ease: Power1.easeInOut }, 0)
      .to(document.querySelector('.video-pop-up'), 0.1, { opacity: 1, ease: Power3.easeInOut }, 0.7)
      .to(this.videoPlayer, 1.4, { opacity: 1, y: 0, ease: Expo.easeOut }, 0.7)
      .to(this.caseName, 1.4, { opacity: 1, y: 0, ease: Expo.easeOut }, 0.9)
      .to(this.caseLink, 1.4, { opacity: 1, y: 0, ease: Expo.easeOut }, 1)
  }

  closeAnimation(callback) {

    const tl = new TimelineMax({ onComplete: callback })

    tl
      .to(this.videoPlayer, 1, { opacity: 0, y: '-5vh', ease: Expo.easeOut }, 0.1)
      .to(this.caseName, 1, { opacity: 0, y: '-5vh', ease: Expo.easeOut }, 0.3)
      .to(this.caseLink, 1, { opacity: 0, y: '-5vh', ease: Expo.easeOut }, 0.35)
      .to(this.popUpBg, 1.3, { width: '0vw', height: '0vw', ease: Expo.easeOut }, 0.6)
      .to(this.popUpBg, 1.1, { backgroundColor: 'white', ease: Expo.easeOut }, 0.6)
  }
}

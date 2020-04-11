import { timeFormat } from '../../helpers'

export default class PlayerProgressRange {

  constructor(video, progressBarWrapper, timeCur, timeAll, pause) {

    this.video = video
    this.progressBarWrapper = progressBarWrapper

    this.progressBar = document.querySelector('.video-player__progress-bar')
    this.fakeDisabler = document.querySelector('.video-player__fake-disabler')


    this.timeCur = timeCur
    this.timeAll = timeAll
    this.pause = pause

    this.events()
  }

  events() {


    const progressUpdate = () => {

      if (event.offsetX || event.targetTouches[0].pageX) {

        const w = this.progressBarWrapper.offsetWidth
        const o = event.offsetX || event.targetTouches[0].pageX - event.target.getBoundingClientRect().left

        this.video.currentTime = this.video.duration * (o / w)
      }


    }

    this.progressBarWrapper.addEventListener('mousedown', () => {
      this.progressBarWrapper.addEventListener('mousemove', progressUpdate)
    })

    this.progressBarWrapper.addEventListener('mouseup', () => {
      progressUpdate()
      this.progressBarWrapper.removeEventListener('mousemove', progressUpdate)
    })

    this.progressBarWrapper.addEventListener('mouseleave', () => {
      this.progressBarWrapper.removeEventListener('mousemove', progressUpdate)
    })

    this.progressBarWrapper.addEventListener('touchstart', () => {
      this.progressBarWrapper.addEventListener('touchmove', progressUpdate)
    })

    this.progressBarWrapper.addEventListener('touchend', () => {
      this.progressBarWrapper.removeEventListener('touchmove', progressUpdate)
    })

    this.progressBarWrapper.addEventListener('touchcancel', () => {
      this.progressBarWrapper.removeEventListener('touchmove', progressUpdate)
    })


    this.progressBarWrapper.addEventListener('click', progressUpdate)


    this.currentProgress()


  }

  currentProgress() {

    this.timeCur.innerHTML = timeFormat(this.video.currentTime)
    this.timeAll.innerHTML = timeFormat(this.video.duration)

    const persent = +this.video.currentTime / +this.video.duration * 100

    this.progressBar.style.width = persent + '%'

    if (this.video.currentTime === this.video.duration || this.video.currentTime > this.video.duration) {

      setTimeout(() => {
        this.video.currentTime = 0
        this.progressBar.style.width = 0
        this.pause()
      }, 200)
    }
    window.requestAnimationFrame(this.currentProgress.bind(this))
  }
}

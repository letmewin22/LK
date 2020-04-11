export default class PlayerFullscreen {

  constructor(videoPlayer, videoOverlay, controls) {

    this.videoPlayer = videoPlayer
    this.videoOverlay = videoOverlay
    this.controls = controls

    this.fullScreenBtn = document.querySelector('.video-player__full-screen')


    this.fullScreenBtn.addEventListener('click', this.fullScreen.bind(this))
    this.videoOverlay.addEventListener('dblclick', this.fullScreen.bind(this))

    this.inactiveDelay = 5
    this.timer = 0

    this.active = () => {
      this.timer = 0
    }

  }

  fullScreen() {

    this.videoPlayer.classList.contains('full-screen') === true ? this.closeFullScreen() : this.openFullScreen()

    const exitHandler = () => {
      if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        this.closeFullScreen()
      }
    }

    document.addEventListener('fullscreenchange', exitHandler, false)
    document.addEventListener('webkitfullscreenchange', exitHandler, false)
    document.addEventListener('mozfullscreenchange', exitHandler, false)
    document.addEventListener('MSFullscreenChange', exitHandler, false)
  }

  openFullScreen() {

    let elem = document.documentElement

    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen()
    }

    this.videoPlayer.classList.add('full-screen')
    this.detectInactivity()

  }

  closeFullScreen() {

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen()
    }

    this.videoPlayer.classList.remove('full-screen')
    this.controls.classList.add('active')

    document.removeEventListener('mousemove', this.active)

    clearInterval(this.interval)
    clearInterval(this.timerTicker)
    document.body.style.cursor = 'auto'

  }

  controlsEvent() {

    if (this.timer >= this.inactiveDelay) {
      this.controls.classList.remove('active')
      document.body.style.cursor = 'none'
      return
    } else {
      this.controls.classList.add('active')
      document.body.style.cursor = 'auto'
    }
  }

  detectInactivity() {

    this.timerTicker = setInterval(() => { this.timer++ }, 1000)
    this.interval = setInterval(this.controlsEvent.bind(this), 120)

    document.addEventListener('mousemove', this.active)

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        this.active()
      }
    })

  }
}

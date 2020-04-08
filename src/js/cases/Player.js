export default class Player {

  constructor() {

    this.videoPlayer = document.querySelector('.video-player')
    this.video = document.querySelector('.video-player video')
    this.playBtn = document.querySelector('.video-player__play-button')
    this.playSmallBtn = document.querySelector('.video-player__small-play-button')
    this.progressBar = document.querySelector('.video-player__progress-bar')
    this.progressRange = document.querySelector('html input[type="range"]')
    this.controls = document.querySelector('.video-player__controls')
    this.fullScreenBtn = document.querySelector('.video-player__full-screen')
    this.timeProgress = document.querySelector('.video-player__time')
    this.video.controls = false

    this.events()

  }

  events() {

    this.playBtn.addEventListener('click', this.playingEvents.bind(this))
    this.playSmallBtn.addEventListener('click', this.playingEvents.bind(this))

    this.video.addEventListener('loadedmetadata', () => {
      this.progressRange.setAttribute('max', Math.round(this.video.duration))
    })

    this.fullScreenBtn.addEventListener('click', this.fullScreen.bind(this))

    this.currentProgress()

    this.progressRange.addEventListener('change', () => {

      this.video.currentTime = +this.progressRange.getAttribute('value')
      this.video.currentTime = +this.progressRange.value
    })

    this.video.addEventListener('timeupdate', this.currentProgress.bind(this))

  }

  playingEvents() {

    this.playBtn.classList.contains('playing') === true ? this.pause() : this.play()
  }

  play() {

    this.video.play()
    this.playBtn.classList.add('playing')
    this.controls.classList.add('active')

    this.playBtn.querySelector('img').setAttribute('src', './img/pause.svg')
    this.playSmallBtn.querySelector('img').setAttribute('src', './img/pause.svg')
  }

  pause() {

    this.video.pause()
    this.playBtn.classList.remove('playing')

    this.playBtn.querySelector('img').setAttribute('src', './img/play.svg')
    this.playSmallBtn.querySelector('img').setAttribute('src', './img/play.svg')
  }


  currentProgress() {

    const persent = Math.round(this.video.currentTime) / Math.round(this.video.duration) * 100

    this.progressBar.style.width = persent + '%'

    this.progressRange.value = this.video.currentTime
    this.progressRange.setAttribute('value', Math.round(this.video.currentTime))
    this.timeProgress.innerHTML = this.timeFormat(Math.round(this.video.currentTime))

    if (this.video.currentTime === this.video.duration) {
      setTimeout(() => {
        this.video.currentTime = 0
        this.progressRange.value = 0
        this.pause()
      }, 1000)
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
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen()
    }

    this.video.style.maxHeight = 'none'
    this.videoPlayer.classList.add('full-screen')

  }

  closeFullScreen() {

    if (document.fullscreenElement) {
      document.exitFullscreen()
    }

    this.video.style.maxHeight = '80vh'
    this.videoPlayer.classList.remove('full-screen')

  }

  timeFormat(ms) {

    let hr = Math.floor(ms / 3600),
      min = Math.floor((ms - (hr * 3600)) / 60),
      sec = Math.floor(ms - (hr * 3600) - (min * 60))

    if (min < 10) {
      min = '0' + min
    }
    if (sec < 10) {
      sec = '0' + sec
    }
    return min + ':' + sec
  }
}

export default class Player {

  constructor() {

    this.videoPlayer = document.querySelector('.video-player')
    this.video = document.querySelector('.video-player video')
    this.videoOverlay = document.querySelector('.video-player__overlay')

    this.playBtn = document.querySelector('.video-player__play-button')
    this.playSmallBtn = document.querySelector('.video-player__small-play-button')

    this.controls = document.querySelector('.video-player__controls')
    this.progressBar = document.querySelector('.video-player__progress-bar')
    this.progressRange = document.querySelector('.duration')
    this.soundBtn = document.querySelector('.video-player__sound')
    this.soundRange = document.querySelector('.sound-range')
    this.soundBar = document.querySelector('.video-player__sound-bar')

    this.fullScreenBtn = document.querySelector('.video-player__full-screen')
    this.timeCur = document.querySelector('.cur-time')
    this.timeAll = document.querySelector('.all-time')
    this.loader = document.querySelector('.lds-ripple')

    this.video.controls = false

    this.events()

  }

  events() {

    this.playBtn.addEventListener('click', this.playingEvents.bind(this))
    this.playSmallBtn.addEventListener('click', this.playingEvents.bind(this))
    this.videoOverlay.addEventListener('click', this.playingEvents.bind(this))

    this.video.addEventListener('loadedmetadata', () => {
      this.progressRange.setAttribute('max', Math.round(this.video.duration))

      this.timeCur.innerHTML = this.timeFormat(Math.round(this.video.currentTime))
      this.timeAll.innerHTML = this.timeFormat(Math.round(this.video.duration))
    })

    this.fullScreenBtn.addEventListener('click', this.fullScreen.bind(this))

    this.currentProgress()

    this.progressRange.addEventListener('change', () => {
      this.pause()
      this.video.currentTime = +this.progressRange.value
      this.play()
    })

    this.video.addEventListener('timeupdate', this.currentProgress.bind(this))


    this.video.addEventListener('waiting', () => {
      if (this.loader.classList.contains('active') === false) {
        this.loader.classList.add('active')
      }
    })

    this.video.addEventListener('canplaythrough', () => {
      this.loader.classList.remove('active')
    })

    this.video.addEventListener('progress', this.buffered.bind(this))

    this.soundBtn.querySelector('svg').addEventListener('click', this.soundToogle.bind(this))

    this.soundRange.addEventListener('mousedown', () => {
      this.updateVolume()
      this.soundRange.addEventListener('mousemove', this.updateVolume.bind(this))
    })

    this.soundRange.addEventListener('mouseup', () => {
      this.soundRange.removeEventListener('mousemove', this.updateVolume.bind(this))
    })

    this.videoPlayer.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })

  }

  playingEvents() {

    this.playBtn.classList.contains('playing') === true ? this.pause() : this.play()
  }

  play() {

    this.video.play()
    this.playBtn.classList.add('playing')
    this.controls.classList.add('active')

    this.playBtn.innerHTML = 'Pause'

    this.playSmallBtn.querySelector('.pause').classList.add('active')
    this.playSmallBtn.querySelector('.play').classList.remove('active')

    const persent = +this.soundRange.getAttribute('value') / +this.soundRange.getAttribute('max') * 100

    this.soundBar.style.width = persent + '%'

  }

  pause() {

    this.video.pause()
    this.playBtn.classList.remove('playing')

    this.playBtn.innerHTML = 'Play'

    this.playSmallBtn.querySelector('.pause').classList.remove('active')
    this.playSmallBtn.querySelector('.play').classList.add('active')

    this.loader.classList.remove('active')
  }


  currentProgress() {


    this.progressRange.value = this.video.currentTime
    this.progressRange.setAttribute('value', Math.round(this.video.currentTime))

    this.timeCur.innerHTML = this.timeFormat(Math.round(this.video.currentTime))
    this.timeAll.innerHTML = this.timeFormat(Math.round(this.video.duration))

    const persent = +this.progressRange.getAttribute('value') / +this.progressRange.getAttribute('max') * 100

    this.progressBar.style.width = persent + '%'

    if (this.video.currentTime === this.video.duration) {

      setTimeout(() => {
        this.video.currentTime = 0
        this.progressRange.value = 0
        this.pause()
      }, 200)
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

    // this.video.style.maxHeight = 'none'
    this.videoPlayer.classList.add('full-screen')

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

    // this.video.style.maxHeight = '62vh'
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

  buffered() {

    let duration = this.video.duration

    if (duration > 0) {
      for (let i = 0; i < this.video.buffered.length; i++) {
        if (this.video.buffered.start(this.video.buffered.length - 1 - i) < this.video.currentTime) {
          document.querySelector('.video-player__buffer-bar').style.width = (this.video.buffered.end(this.video.buffered.length - 1 - i) / duration) * 100 + '%'
          break
        }
      }
    }
  }

  soundToogle() {

    if (+this.soundRange.value === 0) {

      this.controlVolumeStatus(0.5)
      this.soundRange.value = 5

    } else {

      this.controlVolumeStatus(0)
      this.soundRange.value = 0

    }
  }

  controlVolumeStatus(val) {

    this.video.volume = val
    this.soundRange.setAttribute('value', val * 10)

    const persent = +this.soundRange.getAttribute('value') / +this.soundRange.getAttribute('max') * 100

    this.soundBar.style.width = persent + '%'

    if (val === 0) {
      this.soundBtn.querySelector('use').setAttribute('xlink:href', '#i-mute')
    } else if (val < 0.5 && val !== 0) {
      this.soundBtn.querySelector('use').setAttribute('xlink:href', '#i-half')
    } else {
      this.soundBtn.querySelector('use').setAttribute('xlink:href', '#i-maxvolume')
    }
  }


  updateVolume() {
    window.requestAnimationFrame(() => {
      this.controlVolumeStatus(this.soundRange.value / 10)
    })
  };

}

export default class PlayerSound {

  constructor(video) {
    this.video = video
    this.state = null

    this.soundBtn = document.querySelector('.video-player__sound')
    this.soundBarWrapper = document.querySelector('.video-player__sound-progress-wrapper')
    this.soundBar = document.querySelector('.video-player__sound-bar')

    this.events()
  }



  events() {

    const soundsUpdate = () => {
      if (event.offsetX > -1) {

        const w = this.soundBarWrapper.offsetWidth
        const o = event.offsetX

        this.soundBar.setAttribute('value', 10 * (o / w))

        this.updateVolume()
      }

      if ('ontouchstart' in document.documentElement || window.DocumentTouch && document instanceof DocumentTouc) {

        const w = this.soundBarWrapper.offsetWidth
        const o = event.targetTouches[0].pageX - event.target.getBoundingClientRect().left
        this.soundBar.setAttribute('value', 10 * (o / w))

        this.updateVolume()
      }
    }
    this.soundBtn.querySelector('svg').addEventListener('click', this.soundToogle.bind(this))

    this.soundBarWrapper.addEventListener('mousedown', () => {
      this.soundBarWrapper.addEventListener('mousemove', soundsUpdate)
    })

    this.soundBarWrapper.addEventListener('mouseup', () => {
      this.soundBarWrapper.removeEventListener('mousemove', soundsUpdate)
    })

    this.soundBarWrapper.addEventListener('mouseleave', () => {
      this.soundBarWrapper.removeEventListener('mousemove', soundsUpdate)
    })

    this.soundBarWrapper.addEventListener('touchstart', () => {
      this.soundBarWrapper.addEventListener('touchmove', soundsUpdate)
    })

    this.soundBarWrapper.addEventListener('touchend', () => {
      this.soundBarWrapper.removeEventListener('touchmove', soundsUpdate)
    })

    this.soundBarWrapper.addEventListener('touchcancel', () => {
      this.soundBarWrapper.removeEventListener('touchmove', soundsUpdate)
    })

    this.soundBarWrapper.addEventListener('click', soundsUpdate)
  }

  soundToogle() {

    if (+this.soundBar.getAttribute('value') === 0 && this.state !== null) {

      this.controlVolumeStatus(this.state / 10)
      this.soundBar.setAttribute('value', this.state)

    } else if (+this.soundBar.getAttribute('value') === 0 && this.state === null) {

      this.controlVolumeStatus(0.5)
      this.soundBar.setAttribute('value', 5)
    } else {

      this.state = +this.soundBar.getAttribute('value')
      this.controlVolumeStatus(0)
      this.soundBar.setAttribute('value', 0)
    }

  }

  controlVolumeStatus(val) {

    this.video.volume = val

    localStorage.setItem('volume', val * 10)

    this.soundBar.setAttribute('value', val * 10)

    const persent = +this.soundBar.getAttribute('value') / +this.soundBar.getAttribute('max') * 100

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
    this.controlVolumeStatus(this.soundBar.getAttribute('value') / 10)
  };
}

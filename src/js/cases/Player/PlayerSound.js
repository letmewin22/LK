export default class PlayerSound {

  constructor(video) {
    this.video = video
    this.state = null

    this.soundBtn = document.querySelector('.video-player__sound')
    this.soundRange = document.querySelector('.sound-range')
    this.soundBar = document.querySelector('.video-player__sound-bar')

    this.events()
  }

  events() {

    this.soundBtn.querySelector('svg').addEventListener('click', this.soundToogle.bind(this))

    this.soundRange.addEventListener('mousedown', () => {
      this.updateVolume()
      this.soundRange.addEventListener('mousemove', this.updateVolume.bind(this))
    })

    this.soundRange.addEventListener('mouseup', () => {
      this.soundRange.removeEventListener('mousemove', this.updateVolume.bind(this))
    })
  }

  soundToogle() {

    if (+this.soundRange.value === 0 && this.state !== null) {

      this.controlVolumeStatus(this.state / 10)
      this.soundRange.value = this.state

    } else if (+this.soundRange.value === 0 && this.state === null) {

      this.controlVolumeStatus(0.5)
      this.soundRange.value = 5
    } else {

      this.state = +this.soundRange.value
      this.controlVolumeStatus(0)
      this.soundRange.value = 0
    }

  }

  controlVolumeStatus(val) {

    this.video.volume = val

    localStorage.setItem('volume', val * 10)

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
    this.controlVolumeStatus(this.soundRange.value / 10)
  };
}

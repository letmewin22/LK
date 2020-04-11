import { timeFormat } from '../../helpers'

import PlayerProgressRange from './PlayerProgressRange'
import PlayerFullscreen from './PlayerFullscreen'
import PlayerBuffer from './PlayerBuffer'
import PlayerSound from './PlayerSound'
import PlayerTooltip from './PlayerTooltip'
import PlayerPlaybackSpeed from './PlayerPlaybackSpeed'

import PlayerContextMenu from './PlayerContextMenu'

export default class Player {

  constructor() {

    this.videoPlayer = document.querySelector('.video-player')
    this.video = document.querySelector('.video-player video')
    this.videoOverlay = document.querySelector('.video-player__overlay')

    this.playBtn = document.querySelector('.video-player__play-button')
    this.playSmallBtn = document.querySelector('.video-player__small-play-button')

    this.controls = document.querySelector('.video-player__controls')

    this.progressBarWrapper = document.querySelector('.video-player__progress-bar-container')

    this.timeCur = document.querySelector('.cur-time')
    this.timeAll = document.querySelector('.all-time')
    this.loader = document.querySelector('.video-player__loader')

    this.video.controls = false

    this.playBtn.addEventListener('click', this.playingEvents.bind(this))
    this.playSmallBtn.addEventListener('click', this.playingEvents.bind(this))
    this.videoOverlay.addEventListener('click', this.playingEvents.bind(this))

    this.spaceEvent = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        this.playingEvents()
      }
    }

    window.addEventListener('keyup', this.spaceEvent)

    if (screen.width > 460) {
      this.events()
    }
  }

  events() {

    const playerSound = new PlayerSound(this.video)

    this.video.addEventListener('loadedmetadata', () => {

      this.timeCur.innerHTML = timeFormat(this.video.currentTime)
      this.timeAll.innerHTML = timeFormat(this.video.duration)

      playerSound.controlVolumeStatus(+JSON.stringify(localStorage.getItem('volume') / 10) || 0.5)

    })

    new PlayerFullscreen(this.videoPlayer, this.videoOverlay, this.controls)

    new PlayerProgressRange(this.video, this.progressBarWrapper, this.timeCur, this.timeAll, this.pause.bind(this))

    new PlayerTooltip(this.videoPlayer, this.video, this.progressBarWrapper)

    new PlayerBuffer(this.video, this.loader)

    new PlayerContextMenu(this.videoPlayer)

    new PlayerPlaybackSpeed(this.video)
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

  }

  pause() {

    this.video.pause()
    this.playBtn.classList.remove('playing')
    this.controls.classList.add('active')

    this.playBtn.innerHTML = 'Play'

    this.playSmallBtn.querySelector('.pause').classList.remove('active')
    this.playSmallBtn.querySelector('.play').classList.add('active')

    this.loader.classList.remove('active')
  }

  removeSpaceEvent() {
    window.removeEventListener('keyup', this.spaceEvent)
  }

}

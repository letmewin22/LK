import { timeFormat } from '../../helpers.js'

export default class PlayerTooltip {

  constructor(videoPlayer, video, progressRange) {

    this.videoPlayer = videoPlayer
    this.video = video
    this.progressRange = progressRange

    this.events()
  }

  events() {

    this.progressRange.addEventListener('mousemove', this.addTooltip.bind(this))

    this.progressRange.addEventListener('mouseleave', this.removeTooltip.bind(this))

    this.progressRange.addEventListener('touchmove', this.addTooltip.bind(this))

    this.progressRange.addEventListener('touchend', this.removeTooltip.bind(this))
  }

  addTooltip() {

    if (!this.videoPlayer.querySelector('.video-player__progress-tooltip')) {

      const el = document.createElement('div')
      el.classList.add('video-player__progress-tooltip')
      this.videoPlayer.appendChild(el)
      el.classList.add('active')
    }

    const tooltip = this.videoPlayer.querySelector('.video-player__progress-tooltip')
    const w = this.progressRange.offsetWidth
    const o = event.offsetX || event.targetTouches[0].pageX - event.target.getBoundingClientRect().left

    tooltip.style.left = (o + tooltip.getBoundingClientRect().width / 2) + 'px'
    tooltip.style.bottom = 40 + 'px'
    tooltip.innerHTML = timeFormat(this.video.duration * (o / w))
  }

  removeTooltip() {

    if (this.videoPlayer.querySelector('.video-player__progress-tooltip')) {

      this.videoPlayer.removeChild(this.videoPlayer.querySelector('.video-player__progress-tooltip'))
    }
  }
}

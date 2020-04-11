export default class PlayerPlaybackSpeed {

  constructor(video) {

    this.video = video
    this.events()

  }

  events() {

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Digit1') {
        this.video.playbackRate = 1.0
      } else if (e.code === 'Digit2') {
        this.video.playbackRate = 1.5
      } else if (e.code === 'Digit3') {
        this.video.playbackRate = 2.0
      }
    })
  }
}

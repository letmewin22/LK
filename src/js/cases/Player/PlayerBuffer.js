export default class PlayerBuffer {

  constructor(video, loader) {

    this.video = video
    this.loader = loader

    this.video.addEventListener('progress', this.buffered.bind(this))

    this.video.addEventListener('waiting', () => {
      if (this.loader.classList.contains('active') === false) {
        this.loader.classList.add('active')
      }
    })

    this.video.addEventListener('canplaythrough', () => {
      this.loader.classList.remove('active')
    })
  }

  buffered() {
    let duration = this.video.duration

    if (duration > 0) {

      if (this.video.buffered.length > 0) {

        for (let i = 0; i < this.video.buffered.length; i++) {
          if (this.video.buffered.start(this.video.buffered.length - 1 - i) < this.video.currentTime) {
            document.querySelector('.video-player__buffer-bar').style.width = (this.video.buffered.end(this.video.buffered.length - 1 - i) / duration) * 100 + '%'
            break
          }
        }
      }

    }
  }
}

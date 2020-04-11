export default class PlayerContextMenu {
  constructor(videoPlayer) {

    this.videoPlayer = videoPlayer

    document.body.addEventListener('contextmenu', (e) => {
      if (e.target !== this.videoPlayer.querySelector('.video-player__overlay')) {
        this.removeElement()
      }
    })

    this.videoPlayer.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      this.createElement()
    })

    document.body.addEventListener('click', (e) => {

      if (e.target !== this.videoPlayer.querySelector('.video-player__contextmenu')) {
        this.removeElement()
      }

    })
  }

  createElement() {

    if (!this.videoPlayer.querySelector('.video-player__contextmenu')) {

      const el = document.createElement('div')
      el.classList.add('video-player__contextmenu')
      this.videoPlayer.appendChild(el)
    }

    this.contextmenu = this.videoPlayer.querySelector('.video-player__contextmenu')
    
    const x = event.offsetX
    const y = event.offsetY

    this.contextmenu.style.left = x + 'px'
    this.contextmenu.style.top = y + 'px'

    this.contextmenu.innerHTML = 'Share'

    this.contextmenu.addEventListener('click', this.copyLink.bind(this, window.location.href))


  }

  removeElement() {
    if (this.videoPlayer.querySelector('.video-player__contextmenu')) {

      this.videoPlayer.removeChild(this.videoPlayer.querySelector('.video-player__contextmenu'))
    }
  }

  copyLink(str) {

    const el = document.createElement('textarea')
    
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    el.style.zIndex = '-100'

    document.body.appendChild(el)
    const selected =
      document.getSelection().rangeCount > 0 ?
        document.getSelection().getRangeAt(0) :
        false

    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    if (selected) {
      document.getSelection().removeAllRanges()
      document.getSelection().addRange(selected)
    }
    this.contextmenu.innerHTML = 'Link was copied to clipboard'


    const promise = new Promise((resolve) => {

      setTimeout(() => {
        this.contextmenu.classList.add('hide')

        resolve()
      }, 800)
    })

    promise.then(() => {

      setTimeout(() => {
        this.removeElement()
      }, 1100)
    })

  }

}

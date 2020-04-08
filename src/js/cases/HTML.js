export default class HTML {
	
  static markup(num) {
  	
    return `<div class="video-pop-up ${num}">
  <button class="close-pop-up">Close</button>
  <div class="video-player">
    <video poster="./img/posters/${num}.jpg" style="margin: 0 auto; opacity:1; display:block; max-width: 100%">
      <source src="./video/${num}.mp4" type="video/mp4"></video>
    <button class="video-player__play-button"><img src="./img/play.svg" alt="play" /></button>
    <div class="video-player__controls">
      <div class="video-player__controls-left">
        <div class="video-player__time">00:00:00</div>
        <div class="video-player__small-play-button"><img src="./img/play.svg" alt="play" /></div>
      </div>
      <div class="video-player__progress-bar-container">
        <input type="range" value="0" min="0">
        <div class="video-player__progress-bar"></div>
      </div>
      <div class="video-player__full-screen">
        <img src="./img/fullscreen.svg" alt="fullscreen" />
      </div>
    </div>
  </div>
</div>`
  }
}

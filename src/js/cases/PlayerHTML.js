export default class PlayerHTML {
  static markup(num, video, poster) {
    return `<div class="video-player">
  <div class="video-player__overlay"></div>
  <video poster="./img/posters/${poster}" style="margin: 0 auto; opacity:1; display:block; max-width: 100%">
    <source src="./video/${video}" type="video/mp4"></video>
  <button class="video-player__play-button">PLAY</button>
  <div class="video-player__loader">
    <div></div>
    <div></div>
  </div>
  <div class="video-player__controls">
    <svg class="svg-icon__sprite" xmlns="http://www.w3.org/2000/svg">
      <symbol id="i-maxvolume" viewbox="0 0 20 20">
        <path d="M15.2734 10C15.2734 8.61328 14.4258 7.42578 13.2227 6.92578L12.582 8.46484C13.1836 8.71484 13.6055 9.30859 13.6055 10.0039C13.6055 10.6953 13.1836 11.2891 12.582 11.543L13.2227 13.082C14.4258 12.5742 15.2734 11.3867 15.2734 10V10ZM14.5039 3.84766L13.8633 5.38672C15.6719 6.14062 16.9414 7.92187 16.9414 10C16.9414 12.082 15.6719 13.8594 13.8633 14.6133L14.5039 16.1523C16.9141 15.1484 18.6055 12.7734 18.6055 10C18.6055 7.22656 16.9141 4.85156 14.5039 3.84766ZM1.94141 5.83203V14.1641H5.27344L11.1055 20V0L5.27344 5.83203H1.94141Z" />
      </symbol>
      <symbol id="i-mute" viewbox="0 0 20 20">
        <path d="M1.94141 5.83203V14.1641H5.27344L11.1055 20V0L5.27344 5.83203H1.94141Z" />
        <path d="M18 7.56452L17.3651 7L15.5397 8.93548L13.6349 7L13 7.56452L14.9048 9.5L13 11.4355L13.6349 12L15.5397 10.0645L17.3651 12L18 11.4355L16.0952 9.5L18 7.56452Z" />
      </symbol>
      <symbol id="i-half" viewbox="0 0 20 20">
        <path d="M15.2734 10C15.2734 8.61328 14.4258 7.42578 13.2227 6.92578L12.582 8.46484C13.1836 8.71484 13.6055 9.30859 13.6055 10.0039C13.6055 10.6953 13.1836 11.2891 12.582 11.543L13.2227 13.082C14.4258 12.5742 15.2734 11.3867 15.2734 10ZM1.94141 5.83203V14.1641H5.27344L11.1055 20V0L5.27344 5.83203H1.94141Z" />
      </symbol>
    </svg>
    <div class="video-player__controls-top">
      <div class="video-player__controls-left">
        <div class="video-player__small-play-button">
          <svg class="play" width="10" height="12" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1.76619C0 0.988896 0.847971 0.508783 1.5145 0.908698L8.57084 5.14251C9.21818 5.53091 9.21818 6.46909 8.57085 6.85749L1.5145 11.0913C0.847972 11.4912 0 11.0111 0 10.2338V1.76619Z" />
          </svg>
          <svg class="pause" height="12" viewBox="-45 0 327 327" width="10" xmlns="http://www.w3.org/2000/svg">
            <path d="m158 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0" />
            <path d="m8 0h71c4.417969 0 8 3.582031 8 8v311c0 4.417969-3.582031 8-8 8h-71c-4.417969 0-8-3.582031-8-8v-311c0-4.417969 3.582031-8 8-8zm0 0" /></svg>
        </div>
        <div class="video-player__time"><span class="cur-time">00:00</span>&nbsp;/&nbsp;<span class="all-time">00:00</span></div>
      </div>
      <div class="video-player__controls-right">
        <div class="video-player__sound draggable='false'">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use class="use" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#i-maxvolume"></use>
          </svg>
          <div class="video-player__sound-progress-wrapper">
            <input type="range" class="sound-range" value="10" min="0" max="10">
            <div class="video-player__sound-bar"></div>
          </div>
        </div>
        <div class="video-player__full-screen">
          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4C2 2.89543 2.89543 2 4 2H6C6.55228 2 7 1.55228 7 1V1C7 0.447715 6.55228 0 6 0H2C0.89543 0 0 0.895431 0 2V6C0 6.55228 0.447715 7 1 7V7C1.55228 7 2 6.55228 2 6V4ZM7 17C7 16.4477 6.55228 16 6 16H4C2.89543 16 2 15.1046 2 14V12C2 11.4477 1.55228 11 1 11V11C0.447715 11 0 11.4477 0 12V16C0 17.1046 0.895431 18 2 18H6C6.55228 18 7 17.5523 7 17V17ZM18 12C18 11.4477 17.5523 11 17 11V11C16.4477 11 16 11.4477 16 12V14C16 15.1046 15.1046 16 14 16H12C11.4477 16 11 16.4477 11 17V17C11 17.5523 11.4477 18 12 18H16C17.1046 18 18 17.1046 18 16V12ZM16 6C16 6.55228 16.4477 7 17 7V7C17.5523 7 18 6.55228 18 6V2C18 0.89543 17.1046 0 16 0H12C11.4477 0 11 0.447715 11 1V1C11 1.55228 11.4477 2 12 2H14C15.1046 2 16 2.89543 16 4V6Z" />
          </svg>
        </div>
      </div>
    </div>
    <div class="video-player__progress-bar-container">
      <input type="range" class="duration" step="0.025" value="0" min="0">
      <div class="video-player__progress-bar"></div>
      <div class="video-player__buffer-bar"></div>
    </div>
  </div>
</div>`
  }
}

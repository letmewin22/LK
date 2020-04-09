import PlayerHTML from './PlayerHTML'
import { data } from './casesData'

export default class HTML {

  static caseData() {
    return Object.values(data).map(el => {
      return el
    })
  }

  static markup(num) {

    return `<div class="video-pop-up ${num}">
  <button class="close-pop-up">Close</button>
  ${PlayerHTML.markup(num, this.caseData()[num].video, this.caseData()[num].poster)}
  <div class="case-info">
    <div class="case-name">${this.caseData()[num].name}</div>

    <a target="_blank" href="${this.caseData()[num].link}" class="case-link">View website</a>
  </div>
</div>
`
  }
}

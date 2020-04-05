import Highway from '@dogstudio/highway'
import imagesLoaded from 'imagesloaded'

import * as tornis from '../lib/tornis'

import defaultLoader from '../loaders/defaultLoader'
import aboutLoader from '../loaders/aboutLoader'
import RepeatedText from '../RepeatedText'
import Distort from '../Distort'
import MousemoveParallax from '../ui/MousemoveParallax'


class CustomRendererAbout extends Highway.Renderer {

  onEnterCompleted() {


    new MousemoveParallax({
      img: document.querySelector('.header-container__emotion'),
      target: document.querySelector('.h1-decor'),
      effect: 30
    })

    const textRepeat = new RepeatedText({
      lineTop: document.querySelector('.repeated-text--about'),
      time: 15
    })

    textRepeat.oneLine()

    window.addEventListener('load', () => {
      defaultLoader(aboutLoader)
    })

    if (document.body.style.opacity === '1') {
      aboutLoader()
      document.body.style.position = 'static'

    }

    // if (screen.width > 1024) {
    //   const app = new Distort({ images: [...document.querySelectorAll('.js-webgl-image')] })

    //   imagesLoaded('.cases', () => {

    //     app.init()

    //     const updateValues = ({ size, scroll }) => {
    //       if (size.changed) {
    //         app.engine.resize()
    //         app.setElementsBounds()
    //         app.setElementsStyle()
    //         app.setElementsPosition()
    //       }

    //       if (scroll.changed) {
    //         app.animateFisheye({ value: scroll.velocity.y })
    //         app.setElementsPosition()
    //       }
    //     }
    //     tornis.watchViewport(updateValues)
    //   })
    // }
  }
}
// Don`t forget to export your renderer
export default CustomRendererAbout

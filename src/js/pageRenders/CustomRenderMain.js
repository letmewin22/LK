import Highway from '@dogstudio/highway'
import imagesLoaded from 'imagesloaded'

import defaultLoader from '../loaders/defaultLoader'
import mainLoader from '../loaders/mainLoader.js'
import MousemoveParallax from '../ui/MousemoveParallax'
import Distort from '../Distort'
import CustomCursor from '../ui/CustomCursor'
import RepeatedText from '../RepeatedText'



class CustomRendererMain extends Highway.Renderer {

  onEnterCompleted() {

    const textRepeat = new RepeatedText({
      lineTop: document.querySelector('.repeated-text--top'),
      lineBottom: document.querySelector('.repeated-text--bottom'),
      time: 15
    })



    textRepeat.twoLines()

    window.addEventListener('load', () => {
      defaultLoader(mainLoader)
    })

    if (!document.querySelector('.page-loader')) {
      mainLoader()
      document.body.style.position = 'static'
    }

    if (screen.width > 1024) {
      new CustomCursor(document.querySelector('.cursor'), document.querySelectorAll('.cursor-active'))
    }

    new MousemoveParallax({
      img: document.querySelector('.header-container__my-photo'),
      target: document.querySelector('.h1-decor'),
      effect: 100,
      rotation: false
    })

    if (screen.width > 768) {
      const app = new Distort([...document.querySelectorAll('.js-webgl-image')])

      imagesLoaded('.cases', () => app.init())
    }

  }
}
// Don`t forget to export your renderer
export default CustomRendererMain

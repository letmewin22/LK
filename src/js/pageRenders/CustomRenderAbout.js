import Highway from '@dogstudio/highway'
import imagesLoaded from 'imagesloaded'

import defaultLoader from '../loaders/defaultLoader'
import aboutLoader from '../loaders/aboutLoader'
import RepeatedText from '../RepeatedText'
import Distort from '../Distort'
import MousemoveParallax from '../ui/MousemoveParallax'
import {TextSplit, splitLines } from '../helpers.js'


class CustomRendererAbout extends Highway.Renderer {

  onEnterCompleted() {

    const text = document.querySelector('.about-text')

    TextSplit(document.querySelectorAll('.about-text p'), 'lines')
    text.querySelectorAll('p').forEach(elem => { splitLines(elem) })

    const textRepeat0 = new RepeatedText({
      lineTop: document.querySelector('.repeated-text--top'),
      lineBottom: document.querySelector('.repeated-text--bottom'),
      time: 15
    })


    textRepeat0.twoLines()

    new MousemoveParallax({
      img: document.querySelector('.header-container__emotion'),
      target: document.querySelector('.h1-decor'),
      effect: 30,
      rotation: false
    })

    const textRepeat = new RepeatedText({
      lineTop: document.querySelector('.repeated-text--about'),
      time: 15
    })

    textRepeat.oneLine()

    window.addEventListener('load', () => {
      defaultLoader(aboutLoader)
    })

    if (!document.querySelector('.page-loader')) {
      aboutLoader()
      document.body.style.position = 'static'

    }

    if (screen.width > 768) {
      const app = new Distort([...document.querySelectorAll('.js-webgl-image')])

      imagesLoaded('.cases', () => app.init())
    }
  }
}
// Don`t forget to export your renderer
export default CustomRendererAbout

import Highway from '@dogstudio/highway'

import './lib/smoothscroll'

import LinkStroke from './LinksStroke'
import ScrollAnimations from './scroll/ScrollAnimations.js'
import Button from './ui/Button'
import Nav from './ui/Nav'
import RepeatedText from './RepeatedText'

import CustomRendererMain from './pageRenders/CustomRenderMain'
import CustomRendererAbout from './pageRenders/CustomRenderAbout'
// import Transition from './Transition'
import SimpleTransition from './transitions/SimpleTransition'


window.addEventListener('load', () => {
  const textRepeat = new RepeatedText({
    lineTop: document.querySelector('.repeated-text--top'),
    lineBottom: document.querySelector('.repeated-text--bottom'),
    time: 15
  })

  
  
  textRepeat.twoLines()

  new ScrollAnimations()

  new Button(document.querySelectorAll('.button'))

  if (screen.width < 769) {
    new Nav(document.querySelector('nav'), document.querySelector('.burger'))
  }

  LinkStroke.strokeSvgEvents()
})


const H = new Highway.Core({
  renderers: {
    main: CustomRendererMain,
    about: CustomRendererAbout
  },
  transitions: {
    default: SimpleTransition
  }
})

H.on('NAVIGATE_END', () => {
  LinkStroke.strokeSvgEvents()
  new ScrollAnimations()

  const textRepeat = new RepeatedText({
    lineTop: document.querySelector('.repeated-text--top'),
    lineBottom: document.querySelector('.repeated-text--bottom'),
    time: 15
  })

  textRepeat.twoLines()

  new Button(document.querySelectorAll('.button'))

})

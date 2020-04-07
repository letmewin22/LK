import Highway from '@dogstudio/highway'

import './lib/smoothscroll'

import LinkStroke from './LinksStroke'
import ScrollAnimations from './scroll/ScrollAnimations'
import Button from './ui/Button'
import Nav from './ui/Nav'
import FormSubmit from './form/FormSubmit'
import FormWindows from './form/formWindows/FormWindows'

import {navLinksDetect} from './helpers.js'

import CustomRendererMain from './pageRenders/CustomRenderMain'
import CustomRendererAbout from './pageRenders/CustomRenderAbout'
import CustomRendererProjects from './pageRenders/CustomRenderProjects'
import CustomRendererContacts from './pageRenders/CustomRenderContacts'
// import Transition from './Transition'
import SimpleTransition from './transitions/SimpleTransition'


window.addEventListener('load', () => {

  navLinksDetect()
  new FormSubmit()
  new FormWindows()
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
    about: CustomRendererAbout,
    projects: CustomRendererProjects,
    contacts: CustomRendererContacts
  },
  transitions: {
    default: SimpleTransition
  }
})

H.on('NAVIGATE_IN', () => {
  navLinksDetect()
})

H.on('NAVIGATE_END', () => {
  new FormSubmit()
  new FormWindows()
  LinkStroke.strokeSvgEvents()
  new ScrollAnimations()

  new Button(document.querySelectorAll('.button'))

})


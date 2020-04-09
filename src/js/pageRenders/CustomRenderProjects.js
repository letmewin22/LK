import Highway from '@dogstudio/highway'
import imagesLoaded from 'imagesloaded'

import * as tornis from '../lib/tornis'

import defaultLoader from '../loaders/defaultLoader'
import projectsLoader from '../loaders/projectsLoader.js'
import Distort from '../Distort'
import CustomCursor from '../ui/CustomCursor'


class CustomRendererProjects extends Highway.Renderer {

  onEnterCompleted() {

    window.addEventListener('load', () => {
      defaultLoader(projectsLoader)
    })

    if (document.body.style.opacity === '1') {
      projectsLoader()
      document.body.style.position = 'static'
    }

    if (screen.width > 1024) {
      new CustomCursor(document.querySelector('.cursor'), document.querySelectorAll('.cursor-active'))
    }

    if (screen.width > 1024) {
      const app = new Distort({ images: [...document.querySelectorAll('.js-webgl-image')] })

      imagesLoaded('.cases', () => {

        app.init()

        const updateValues = ({ size, scroll }) => {
          if (size.changed) {
            app.engine.resize()
            app.setElementsBounds()
            app.setElementsStyle()
            app.setElementsPosition()
          }

          if (scroll.changed) {
            app.animateFisheye({ value: scroll.velocity.y })
            app.setElementsPosition()
          }
        }
        tornis.watchViewport(updateValues)
      })
    }

  }
}
// Don`t forget to export your renderer
export default CustomRendererProjects

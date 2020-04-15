import Highway from '@dogstudio/highway'
import imagesLoaded from 'imagesloaded'

import defaultLoader from '../loaders/defaultLoader'
import projectsLoader from '../loaders/projectsLoader.js'
import Distort from '../Distort'
import CustomCursor from '../ui/CustomCursor'


class CustomRendererProjects extends Highway.Renderer {

  onEnterCompleted() {

    window.addEventListener('load', () => {
      defaultLoader(projectsLoader)
    })

    if (!document.querySelector('.page-loader')) {
      projectsLoader()
      document.body.style.position = 'static'
    }

    if (screen.width > 1024) {
      new CustomCursor(document.querySelector('.cursor'), document.querySelectorAll('.cursor-active'))
    }

    if (screen.width > 768) {
      const app = new Distort([...document.querySelectorAll('.js-webgl-image')])

      imagesLoaded('.cases', () => app.init())
    }

  }
}
// Don`t forget to export your renderer
export default CustomRendererProjects

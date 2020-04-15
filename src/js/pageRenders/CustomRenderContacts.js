import Highway from '@dogstudio/highway'

import defaultLoader from '../loaders/defaultLoader'
import contactsLoader from '../loaders/contactsLoader'


class CustomRendererContacts extends Highway.Renderer {

  onEnterCompleted() {


    window.addEventListener('load', () => {
      defaultLoader(contactsLoader)
    })

    if (!document.querySelector('.page-loader')) {
      contactsLoader()
      document.body.style.position = 'static'

    }

  }
}
// Don`t forget to export your renderer
export default CustomRendererContacts

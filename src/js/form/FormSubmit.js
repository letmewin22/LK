import FormInputs from './FormInputs'
import FormWindows from './formWindows/FormWindows'
import FormAnimations from './formWindows/FormAnimations'
import serialize from './formSend'
import pseudoPrototype from './pseudo.prototype'

export default class FormSubmit extends FormInputs {

  constructor() {
    super()
    pseudoPrototype()

    this.thankYouWindow = document.querySelector('.thank-you-window')
    this.thankYouWindowText = this.thankYouWindow.querySelector('h2')

    this.form.onsubmit = (e) => this.submit(e)

  }

  requestLoad() {

    const formClose = new FormWindows()
    setTimeout(() => formClose.closeForm(), 2500)

    FormAnimations.thankYou(this.thankYouWindow, this.thankYouWindowText)



    this.form.reset()
    document.body.classList.remove('form-focused')
    for (let input of this.input) {
      input.classList.remove('focus')
      input.value = ''
    }

  }


  async requestSend() {

    const URL = this.form.getAttribute('data-url')

    try {

      await fetch(URL, {
        method: 'POST',
        body: serialize(this.form),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
        .then(response => response.status >= 200 && response.status < 400 ?
          // this.requestLoad() : alert('При отправке произошла ошибка:('))
          this.requestLoad() : this.requestLoad())

    } catch (e) {
      console.log(e.message)
    }
  }



  submit(e) {

    e.preventDefault()
    this.requestSend()

    return false
  }
}

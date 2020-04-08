import pseudoPrototype from '../pseudo.prototype.js'
import Validator from './Validator.js'
import FormAnimations from './FormAnimations.js'

export default class FormWindows {

  constructor() {

    pseudoPrototype()

    this.form = document.querySelector('.pop-up-form')
    this.formScreens = document.querySelectorAll('.screen-wrapper')
    this.formH = document.querySelectorAll('.form-h2')

    this.formNextBtns = document.querySelectorAll('.next')
    this.formOpenBtns = document.querySelectorAll('.form-handler')
    this.formCloseBtn = document.querySelector('.close-form')

    this.counterHTML = document.querySelector('.form-counter .current')
    this.inputs = document.querySelectorAll('.text-field')
    this.inputWrapper = document.querySelectorAll('.input-wrapper')

    this.count = 1

    this.events()

  }

  events() {

    this.formNextBtns.forEach(elem => elem.addEventListener('click', (e) => { e.preventDefault() }))
    this.formOpenBtns.forEach(elem => elem.addEventListener('click', this.openForm.bind(this, elem)))
    this.formCloseBtn.addEventListener('click', () => this.closeForm())

    this.inputs.forEach(elem => elem.addEventListener('input', () => Validator.validation.call(this, elem)))
    this.formNextBtns.forEach(elem => elem.addEventListener('click', this.counter.bind(this, event)))
  }

  openForm(elem) {

    setTimeout(() => this.screens(), 400)

    FormAnimations.open(this.form, elem)

    document.body.style.overflow = 'hidden'
    this.form.classList.add('opened')
  }

  closeForm() {

    FormAnimations.close(this, this.screens.bind(this, 0))

    this.form.classList.remove('opened')
    document.body.style.overflow = 'initial'

    this.count = 1
    this.counterHTML.innerHTML = this.count
  }

  screens(cur = 0) {

    for (let i = 0; i < this.formScreens.length; i++) {

      this.formScreens[i].classList.remove('active')
      this.formScreens[0 + cur].classList.add('active')

      FormAnimations.screens(this.formScreens[i], this.formScreens[0 + cur])

    }
  }

  counter() {

    const input = this.inputs[this.count - 1]
    const koef = +input.nextElementSibling.querySelector('.form-validate-text').getAttribute('data-value')

    Validator.validation(input)

    input.value.trim('').length >= koef &&
      input.getAttribute('id') !== 'email' ?
      this.counterEvent() :
      Validator.emailValidation(input.value.trim('')) === true ?
        this.counterEvent() : null
  }

  counterEvent() {

    this.count++

    if (this.count >= 3) {
      this.count = 3
    }
    const callback = () => {
      this.counterHTML.innerHTML = this.count
    }

    FormAnimations.counter(this.counterHTML, callback)

    this.screens(this.count - 1)


  }


}

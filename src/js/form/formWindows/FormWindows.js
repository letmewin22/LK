import pseudoPrototype from '../pseudo.prototype.js'
import Validator from './Validator.js'

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

    this.count = 1
    this.koef = 1

    this.screens()
    this.events()

  }

  events() {
    
    this.formNextBtns.forEach(elem => elem.addEventListener('click', (e) => { e.preventDefault() }))
    this.formOpenBtns.forEach(elem => elem.addEventListener('click', () => this.openForm()))
    this.formCloseBtn.addEventListener('click', () => this.closeForm())

    this.inputs.forEach(elem => elem.addEventListener('input', () => Validator.validation.call(this, elem)))
    this.formNextBtns.forEach(elem => elem.addEventListener('click', this.counter.bind(this, event)))
  }

  openForm() {

    this.form.classList.add('opened')
    document.body.style.overflow = 'hidden'
  }

  closeForm() {

    this.form.classList.remove('opened')
    document.body.style.overflow = 'initial'
  }

  screens(cur = 0) {

    for (let i = 0; i < this.formScreens.length; i++) {
      this.formScreens[i].style.opacity = 0
      this.formScreens[i].style.pointerEvents = 'none'

      this.formScreens[0 + cur].style.opacity = 1
      this.formScreens[0 + cur].style.pointerEvents = 'auto'
    }
  }

  counter(e) {

    e.preventDefault()

    Validator.validation(this.inputs[this.count - 1])

    this.inputs[this.count - 1].value.trim('').length >= this.koef &&
      this.inputs[this.count - 1].getAttribute('id') !== 'email' ?
      this.counterEvent() :
      Validator.emailValidation(this.inputs[this.count - 1].value.trim('')) === true ?
        this.counterEvent() : null
  }

  counterEvent() {
    this.count++

    if (this.count >= 3) {
      this.count = 3
    }

    this.counterHTML.innerHTML = this.count

    this.screens(this.count - 1)
  }


}

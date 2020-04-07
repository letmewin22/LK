export default class FormInputs {

  constructor() {

    this.input = document.querySelectorAll('.input-wrapper input')
    this.form = document.querySelector('form')
    this.phone = document.getElementById('email')
    this.formButton = document.querySelector('.form .button')
    this.label = document.querySelectorAll('label')[2]

    this.focus()
    this.blur()
    this.reset()
  }

  focus() {

    let that = this

    function focus() {
      this.classList.add('focus')
      document.body.classList.add('form-focused')
    }

    for (let input of that.input) {
      input.addEventListener('focus', focus)
    }
  }

  blur() {

    let that = this

    function blur() {
      if (this.value === '') {
        this.classList.remove('focus')
        document.body.classList.remove('form-focused')
      }
    }

    for (let input of that.input) {
      input.addEventListener('blur', blur)
    }
  }

  reset() {

    document.body.onclick = () => {
      this.label.classList = 'label'
    }
  }

}

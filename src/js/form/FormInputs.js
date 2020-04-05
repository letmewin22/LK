export default class FormInputs {

  constructor() {

    this.input = document.querySelectorAll('.input-wrapper input'),
    this.form = document.querySelector('form'),
    this.phone = document.getElementById('phone'),
    this.chbox = document.querySelector('.input-checkbox'),
    this.validateText = document.querySelector('.form-validate-text'),
    this.formButton = document.querySelector('.form .button'),
    this.thankyouButton = document.querySelector('.thank-you-screen .button'),
    this.label = document.querySelectorAll('.label'),
    this.popUpButton = document.querySelector('.button.pop-up'),
    this.formPopUp = document.querySelector('.form-pop-up'),
    this.popUpClose = document.querySelector('.close-pop-up'),
    this.thankYouScreen = document.querySelector('.thank-you-screen'),
    this.thankYouScreenBg = document.querySelector('.thank-you-bg'),
    this.thankYouScreenBg2 = document.querySelector('.thank-you-bg-white'),
    this.thankYouScreenContent = document.querySelector('.thank-you-content'),
    this.thislabel = document.querySelectorAll('label')[1]

    this.formPopUpEvents()
    this.focus()
    this.blur()
    this.reset()
    // this.submit()

  }

  formPopUpEvents() {

    if (this.formPopUp) {
      const popUp = () => {
        this.formPopUp.style.opacity = '1'
        this.formPopUp.style.pointerEvents = 'auto'
      }

      const closePopUp = () => {
        this.formPopUp.style.opacity = '0'
        this.formPopUp.style.pointerEvents = 'none'
      }

      this.popUpButton.addEventListener('click', popUp)
      this.popUpClose.addEventListener('click', closePopUp)
    }
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
      this.validateText.style.opacity = '0'
      this.thislabel.classList = 'label'
    }
    
    this.phone.oninput = () => {
      this.validateText.style.opacity = '0'
      this.thislabel.pseudoStyle().classList = 'label'

    }
  }


}

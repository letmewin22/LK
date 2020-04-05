import FormInputs from './FormInputs.js'
import serialize from '../lib/formSend.js'
import pseudoPrototype from '../lib/pseudo.prototype.js'

export default class FormSubmit extends FormInputs {

  constructor() {
    super()
    pseudoPrototype()

    this.submit()
  }

  requestLoad() {

    let that = this

    setTimeout(() => {
      let tl = new TimelineMax()
      tl
        .to(that.thankYouScreen, 0.01, { display: 'flex', ease: Power1.easeInOut })
        .to(that.thankYouScreenBg2, 1, { opacity: 0.8, ease: Power1.easeInOut })
        .fromTo(that.thankYouScreenBg, 1.5, { y: '100%' }, { y: '0%', ease: Power1.easeInOut }, 0.2)
        .to(that.thankYouScreenContent, 1, { opacity: 1, ease: Power1.easeInOut }, 0.8)

      that.form.reset()
      // dataLayer.push({ 'event': 'otpravka_form' })
      document.body.classList.remove('form-focused')
      for (let input of that.input) {
        input.classList.remove('focus')
      }

      if (that.formPopUp) {
        that.formPopUp.style.opacity = '0'
        that.formPopUp.style.pointerEvents = 'none'
      }

    }, 200)
  }

  validation() {

    let that = this
    that.validateText.innerHTML = 'поле не може бути порожнім'
    that.validateText.style.opacity = '1'
    that.phone.focus()
    that.thislabel.pseudoStyle('after', 'border-color', '#F44336!important')
  }

  submit() {

    let that = this
    

    that.form.onsubmit = (e) => {
      switch (that.phone.value) {

        case '':

          that.validation.bind(that)()
          e.preventDefault()

          return false

          break


        default:

          that.validateText.style.opacity = '0'

          let request = new XMLHttpRequest()
          request.open('POST', './mail.php', true)
          request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')

          let data = serialize(that.form)

          request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
              
              that.requestLoad()
            }
          }

          request.send(data)
          return false
      }
    }
  }

//   onchange() {
//     this.input.addEventListener('input', function (e) {
      
//     }, false);
//     that.form.onsubmit = (e) => {
//     switch (that.phone.value) {

//         case '':

//           that.validation()
//           e.preventDefault()

//           return false

//           break
//   }
// }
// }

}

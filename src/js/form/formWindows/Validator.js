export default class Validator {

  static validation(elem) {

    if (elem.value.trim('').length < 1 && elem.getAttribute('id') !== 'email') {

      Validator.validationErrors(elem)

    } else if (elem.getAttribute('id') === 'email' && Validator.emailValidation(elem.value.trim('')) === false) {
      Validator.validationErrors(elem)
        
    } else {
		 Validator.reset(elem)
    }
  }

  static validationErrors(elem) {

    elem.nextElementSibling.querySelector('.form-validate-text').style.opacity = 1

    elem.focus()
    elem.nextElementSibling.pseudoStyle('after', 'border-color', '#F44336!important')
  }

  static reset(elem) {

    elem.nextElementSibling.pseudoStyle().classList = 'label'
    elem.nextElementSibling.querySelector('.form-validate-text').style.opacity = 0
  }

  static emailValidation(email) {

    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)

  }
}

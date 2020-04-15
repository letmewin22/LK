// Initial state
let scrollPos = 0
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', function() {

  if ((document.body.getBoundingClientRect()).top > scrollPos)
    navbar.classList.remove('nav-hidden')
  else if ((document.body.getBoundingClientRect()).top < scrollPos && scrollPos <= 0)
    navbar.classList.add('nav-hidden')
  	scrollPos = (document.body.getBoundingClientRect()).top
})

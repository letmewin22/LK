import Splitting from 'splitting'

export const TextSplit = (elems, by) => {
  for (let elem of elems)
    Splitting({ target: elem, by })
}

export const splitLines = (selector) => {

  const results = Splitting({ target: selector, by: 'lines' })

  const result = () => {
    return results.map(el => {
      return el.lines.map(elem => {
        return elem
      })
    })
  }
  return result()
}

export const navLinksDetect = () => {
  const navLinks = document.querySelectorAll('nav a')

  for (const link of navLinks) {

    link.classList.remove('active')

    if (link.href === location.href)
      link.classList.add('active')
  }
}

export const timeFormat = (ms) => {

  let hr = Math.floor(ms / 3600),
    min = Math.floor((ms - (hr * 3600)) / 60),
    sec = Math.floor(ms - (hr * 3600) - (min * 60))

  if (min < 10) {
    min = '0' + min
  }
  if (sec < 10) {
    sec = '0' + sec
  }
  return min + ':' + sec
}


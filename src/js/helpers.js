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

    if (link.href === location.href) {
      link.classList.add('active')
    }
  }
}

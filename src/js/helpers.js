import Splitting from 'splitting'

export const TextSplit = (elems, by) => {
  for (let elem of elems)
    Splitting({ target: elem, by })
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
  if (hr > 0) {
    return hr + ':' + min + ':' + sec
  }
  return min + ':' + sec
}

export const splitLines = (elem) => {

  const getLines = () => {
    let lines = []
    let line
    let p = elem
    let words = elem.querySelectorAll('.word')
    let lastTop
    for (let i = 0; i < words.length; i++) {
      let word = words[i]
      if (word.offsetTop !== lastTop) {
        lastTop = word.offsetTop
        line = []
        lines.push(line)
      }
      line.push(word)
    }
    return lines
  }

  const showLines = () => {
    let lines = getLines()
    return lines.map(function(line) {
      return line.map(function(span) {
        return span.innerText
      }).join(' ')
    })
  }

  const showLine = showLines()

  elem.innerHTML = ''
  for (let i = 0; i < showLine.length; i++) {

    elem.innerHTML += `<span class="line-wrapper"><span class="splitted-line">${showLine[i].toLowerCase()}</span></span>`
  }
}

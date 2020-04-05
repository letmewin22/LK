res.forEach(function(elem) {
  let tl = new TimelineMax()
  tl
    .staggerTo(elem, 1.3, { y: 100, ease: Power3.easeOut }, 0.45, 0.4)
})

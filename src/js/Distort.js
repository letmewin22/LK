import * as THREE from 'three'
import { TweenMax, Power3 } from 'gsap'
import * as tornis from './lib/tornis'

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

export default class Distort {

  constructor(images = []) {

    this.scene = null
    this.camera = null

    this.koef = 80

    this.images = images
    this.planesImg = new Array(this.images.length)
    this.planesImgBounds = new Array(this.images.length)

    this.time = 0

  }

  init() {

    this.setup()
    this.setElementsBounds()
    this.createElements()
    this.setElementsStyle()

    this.images.forEach((elem, index) => elem.addEventListener('mouseenter', this.hover.bind(this, index)))
    this.images.forEach((elem, index) => elem.addEventListener('mouseleave', this.hoverOut.bind(this, index)))

    tornis.watchViewport(this.updateValues.bind(this))
  }

  setup() {

    this.scene = new THREE.Scene()

    this.camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      10
    )

    this.camera.position.z = 1

    this.camera.lookAt(this.scene.position)

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xD3D3D3, 0)

    document.querySelector('#app').appendChild(this.renderer.domElement)
  }

  createElements() {

    this.planeGeo = new THREE.PlaneBufferGeometry(0, 0, 32, 32)
    this.planeMat = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { type: 't', value: 0 },
        uDistortion: { type: 'f', value: 0 },
        uScale: { value: 0 },
        uState: { value: 0.15 },
        uShift: { value: 0 },
        uTime: { value: this.time }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true
    })

    this.baseMesh = new THREE.Mesh(this.planeGeo, this.planeMat)

    for (let i = 0; i < this.images.length; i++) {

      this.images[i].classList.add('js-webgl-element-hidden')
      this.planesImg[i] = this.baseMesh.clone()
      this.planesImg[i].material = this.planeMat.clone()
      this.planesImg[i].material.uniforms.uTime.value = this.time

      this.loader = new THREE.TextureLoader()

      this.loader.load(this.images[i].getAttribute('src'), (texture) => {
        texture.minFilter = THREE.LinearFilter
        texture.generateMipmaps = false
        this.planesImg[i].material.uniforms.uTexture = { type: 't', value: texture }
      })

      this.scene.add(this.planesImg[i])
    }

    this.animate()
  }

  setElementsBounds() {

    for (let i = 0; i < this.images.length; i++) {
      const bounds = this.images[i].getBoundingClientRect()

      this.planesImgBounds[i] = {
        x: bounds.x,
        y: bounds.y + (window.scrollY || window.pageYOffset),
        width: bounds.width,
        height: bounds.height
      }
    }

  }

  setElementsStyle() {

    for (let i = 0; i < this.images.length; i++) {

      this.planesImg[i].scale.x = this.images[i].clientWidth
      this.planesImg[i].scale.y = this.images[i].clientHeight
    }

  }


  setElementsPosition() {

    for (let i = 0; i < this.images.length; i++) {
      this.planesImg[i].position.y = -this.planesImgBounds[i].height / 2 + window.innerHeight / 2 - this.planesImgBounds[i].y + (window.scrollY || window.pageYOffset)
      this.planesImg[i].position.x = this.planesImgBounds[i].width / 2 - window.innerWidth / 2 + this.planesImgBounds[i].x
    }
  }

  scrollAnimate({ value }) {

    for (let i = 0; i < this.images.length; i++) {

      TweenMax.to(this.planesImg[i].material.uniforms.uDistortion, 0.5, { value: value / this.koef })
    }


  }

  hover(index) {

    TweenMax.to(this.planesImg[index].material.uniforms.uState, 0.7, { value: 1.2 })
    TweenMax.to(this.planesImg[index].material.uniforms.uScale, 0.7, { value: 0.08, ease: Power3.easeInOut })
    TweenMax.to(this.planesImg[index].material.uniforms.uShift, 0.7, { value: 0.002 })
  }

  hoverOut(index) {

    TweenMax.to(this.planesImg[index].material.uniforms.uState, 0.5, { value: 0.15 })
    TweenMax.to(this.planesImg[index].material.uniforms.uScale, 0.3, { value: 0 })
    TweenMax.to(this.planesImg[index].material.uniforms.uShift, 0.5, { value: 0 })
  }

  animate() {

    this.animateRAF = () => {

      requestAnimationFrame(this.animateRAF)
      this.time++

      for (let i = 0; i < this.images.length; i++) {
        this.planesImg[i].material.uniforms.uTime.value = this.time
      }

      this.renderer.render(this.scene, this.camera)
    }
    this.animateRAF()
  }

  resize() {

    window.addEventListener('resize', () => {

      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)

      this.camera.left = window.innerWidth / -2
      this.camera.right = window.innerWidth / 2
      this.camera.top = window.innerHeight / 2
      this.camera.bottom = window.innerHeight / -2

      this.camera.updateProjectionMatrix()
    })
  }

  updateValues({ size, scroll }) {

    if (size.changed) {
      this.resize()
      this.setElementsBounds()
      this.setElementsStyle()
      this.setElementsPosition()
    }

    if (scroll.changed) {
      this.scrollAnimate({ value: scroll.velocity.y })
      this.setElementsPosition()
    }
  }

}

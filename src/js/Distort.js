import * as THREE from 'three'
import { TimelineMax } from 'gsap'
import * as tornis from './lib/tornis'

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'
import fisheyeFragment from './shaders/fisheyeFragment.glsl'


export default class Distort {

  constructor(images = []) {

    this.scene = null
    this.camera = null

    this.koef = 80

    this.images = images
    this.planesImg = new Array(this.images.length)
    this.planesImgBounds = new Array(this.images.length)

    this.fisheyePP = null

  }

  init() {

    this.setup()
    this.setElementsBounds()
    this.createElements()
    this.setElementsStyle()

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
      antialias: false,
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
        u_resolution: { type: 'v2', value: new THREE.Vector2(400, 400) },
        u_distortion: { type: 'f', value: 0 }
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

      this.planesImg[i].material.uniforms.u_resolution = { type: 't', value: new THREE.Vector2(this.planesImgBounds[i].width, this.planesImgBounds[i].height) }

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

  animateFisheye({ value }) {

    for (let i = 0; i < this.images.length; i++) {

      TweenMax.to(this.planesImg[i].material.uniforms.u_distortion, 0.5, { value: value / this.koef })
    }


  }

  animate() {

    this.animateRAF = () => {
      requestAnimationFrame(this.animateRAF)
      this.renderer.render(this.scene, this.camera)
    }
    this.animateRAF()
  }

  resize() {

    window.addEventListener('resize', () => {
      
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
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
      this.animateFisheye({ value: scroll.velocity.y })
      this.setElementsPosition()
    }
  }
}

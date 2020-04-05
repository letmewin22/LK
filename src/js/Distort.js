import * as BABYLON from 'babylonjs'
import { TweenMax } from 'gsap'

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'
import fisheyeFragment from './shaders/fisheyeFragment.glsl'


export default class Distort {

  constructor({ images = []} = {}) {
    this.canvas = null
    this.engine = null
    this.scene = null
    this.camera = null

    this.koef = 80

    this.images = images
    this.activeImageIndex = 0
    this.planesImg = new Array(this.images.length)
    this.planesImgBounds = new Array(this.images.length)

    this.fisheyePP = null
    this.fisheyeDistortion = { value: 0 }

    this.debug = false

    

  }

  init() {
    this.setup()
    this.setElementsBounds()
    this.createElements()
    this.setElementsStyle()
    this.setFisheye()

  }

  setup() {
    this.canvas = document.querySelector('#app')
    this.engine = new BABYLON.Engine(this.canvas, true, null, true)
    this.scene = new BABYLON.Scene(this.engine)
    this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.0000000000000001)
    // Lights
    // const hemisphericLight = new BABYLON.HemisphericLight('HemisphericLight', new BABYLON.Vector3(1, 1, 0), this.scene)

    // Camera
    this.camera = new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), this.scene)
    this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA


    this.engine.runRenderLoop(() => this.scene.render())
  }

  createElements() {
    /*
     * Images
     */
    BABYLON.Effect.ShadersStore['imagesVertexShader'] = vertex
    BABYLON.Effect.ShadersStore['imagesFragmentShader'] = fragment

    const baseMaterial = new BABYLON.ShaderMaterial(
      'DisplacementMaterial',
      this.scene, {
        vertex: 'images',
        fragment: 'images',
        attributes: ['position', 'normal', 'uv'],
        uniforms: ['worldViewProjection']
      }
    )

    const baseMesh = new BABYLON.PlaneBuilder.CreatePlane('BaseMesh', {}, this.scene)
    const numImages = this.images.length

    for (let i = 0; i < numImages; i++) {
      this.images[i].classList.add('js-webgl-element-hidden')
      this.planesImg[i] = baseMesh.clone(`Image${i.toString().padStart(3, '0')}`)
      this.planesImg[i].material = baseMaterial.clone(`Image0${i}Material`)
      this.planesImg[i].doNotSyncBoundingInfo = true

      const mainTexture = new BABYLON.Texture(this.images[i].src.replace(window.location.href, ''), this.scene, true)
      this.planesImg[i].material.setTexture('u_mainTexture', mainTexture)

    }

  }

  setElementsBounds() {
    // Images
    let num = this.images.length
    for (let i = 0; i < num; i++) {
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
    // Images
    let num = this.images.length
    for (let i = 0; i < num; i++) {
      this.planesImg[i].scaling.x = this.images[i].clientWidth
      this.planesImg[i].scaling.y = this.images[i].clientHeight
    }

  }


  setElementsPosition() {
    // Images
    let num = this.images.length
    for (let i = 0; i < num; i++) {
      this.planesImg[i].position.y = -this.planesImgBounds[i].height / 2 + this.canvas.clientHeight / 2 - this.planesImgBounds[i].y + (window.scrollY || window.pageYOffset)
      this.planesImg[i].position.x = this.planesImgBounds[i].width / 2 - this.canvas.clientWidth / 2 + this.planesImgBounds[i].x
    }

  }

  animateFisheye({ value }) {
    TweenMax.to(this.fisheyeDistortion, 0.5, { value: value / this.koef }) 
  }


  setFisheye() {
    BABYLON.Effect.ShadersStore['fisheyeFragmentShader'] = fisheyeFragment

    this.fisheyePP = new BABYLON.PostProcess('fisheye', 'fisheye', ['u_resolution', 'u_distortion'], null, 1, this.camera, 0, this.engine)
    this.fisheyePP.onApply = effect => {
      effect.setFloat2('u_resolution', this.fisheyePP.width, this.fisheyePP.height)
    }

    this.fisheyePP.onBeforeRenderObservable.add(effect => effect.setFloat('u_distortion', this.fisheyeDistortion.value))
  }

  destroy() {
    this.engine.dispose()
  }
}

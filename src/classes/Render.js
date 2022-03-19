import * as THREE from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import InfiniteGridHelper from '../classes/InfiniteGridHelper'

export default class Render {
    constructor () {
      this.el = document.querySelector('.renderer')
      this.bbox = this.el.getBoundingClientRect()
      this.update = this.update.bind(this)
      this.init()
      this.update()
    }
  
    init () {

      /** Renderer */
      this.clock = new THREE.Clock()
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      })
      this.renderer.setSize(this.bbox.width, this.bbox.height)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.el.appendChild(this.renderer.domElement)
  
      /** Watch renderer resize */
      const Observer = new ResizeObserver(() => {
        this.resize()
      })
      Observer.observe(this.el)
  
      /** Scene */
      this.scene = new THREE.Scene()
      //this.scene.fog = new THREE.FogExp2(0xFFFFFF, 0.03);
  
      /** Camera */
      this.camera = new THREE.PerspectiveCamera(45, this.bbox.width / this.bbox.height, 1, 1000)
      this.camera.position.set(4, 4, 4)

      /** Controls */
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      /** Infinite Grid */

      const grid = new InfiniteGridHelper(this.scene, 100, 1, null, null)
  
      /** Ambient Light */
      this.scene.add(new THREE.AmbientLight(0x222222, 1))
      this.light = new THREE.DirectionalLight(0xffffff, 0.7)
      this.light.position.set(20, 100, 0)
      this.scene.add(this.light)

      /** Create example Object + Mesh */
      const obj = new THREE.Object3D()
      const exampleMesh = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({color: 0xff0000})
      )
      obj.add(exampleMesh)
      this.scene.add(obj)
  
    }


    resize () {
      this.bbox = this.el.getBoundingClientRect()
      this.camera.aspect = this.bbox.width / this.bbox.height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.bbox.width, this.bbox.height)
    }
    
  
    update (timestamp) {
      requestAnimationFrame(() => this.update())
      this.render()
    }
  
    render () {
      this.renderer.render(this.scene, this.camera)
    }
  
  }
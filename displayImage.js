import GenericObject from "./genericObject.js"

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let genericObjects = []

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

function init() {
  genericObjects = [
      new GenericObject({
          x: 50,
          y: 50,
          radius: 20,
          color: colors[0]
      })
  ]
}
//setTimeout(init(), 5);
init()

// Animation Loop

let i = 0

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  genericObjects.forEach((genericObject) => {  
    genericObject.update()
  })

  genericObjects[0].position.y += 1
  genericObjects[0].radius += 1
  genericObjects[0].color = colors[i]

}

animate()
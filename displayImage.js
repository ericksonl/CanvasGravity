import Ball from "./balls.js"
import GenericObject from "./genericObject.js"

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

let balls = []
let genericObjects = []

canvas.width = innerWidth
canvas.height = innerHeight

const colors = ['#e81416', '#ffa500', '#faeb36', '#79c314', '#487de7', '#4b369d', '#70369d']
const gravity = 0.5

function init() {
  balls = [
    new Ball({
      x: 400,
      y: 200,
      velY: 0,
      velX: 0,
      radius: 30,
      mass: 16,
      color: colors[3]
    }),
    new Ball({
      x: 200,
      y: 300,
      velY: 0,
      velX: 0,
      radius: 20,
      mass: 4,
      color: colors[0]
    })
  ]

  genericObjects = [
    new GenericObject({
      x: 400,
      y: 400,
      radius: 300,
      color: '#ffffff'
    })
  ]
}
//setTimeout(init(), 5);
init()


function animate() {
  requestAnimationFrame(animate)
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  genericObjects.forEach((genericObject) => {
    genericObject.update()
  })

  balls.forEach((ball) => {
    ball.update()
    
    ball.velY += gravity

    ball.position.y += ball.velY

    //If ball hits bottom of Canvas
    if (ball.position.y + ball.radius > (genericObjects[0].position.y + genericObjects[0].radius)) {
      //Ball begins going up
      ball.position.y = genericObjects[0].position.y + genericObjects[0].radius - ball.radius
      ball.velY = -ball.velY + (ball.mass * gravity)
    }
  })
}

animate()
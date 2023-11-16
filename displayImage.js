import Ball from "./balls.js";
import GenericObject from "./genericObject.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// const colorSoundMap = {}
const audioFiles = ['./audio/1.wav', './audio/2.wav', './audio/3.wav', './audio/4.wav', './audio/5.wav', './audio/6.wav', './audio/7.wav',]
const ballTracking = new Audio('./BallBounce.wav')
ballTracking.volume = 0.1;
const ballRadius = 40; //Radius for all balls
const colors = ['#e81416', '#ffa500', '#faeb36', '#79c314', '#487de7', '#4b369d', '#70369d'];
let balls = [];

let innerCircle = new GenericObject({
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 300,
  color: '#ffffff'
});

//Function to spawn new ball at click inside inner circle
function getMousePosition(event) {
  let mouseX = event.clientX;
  let mouseY = event.clientY;

  //Calculate distance between mouse click and center of inner circle
  let distance = Math.sqrt((mouseX - innerCircle.position.x) ** 2 + (mouseY - innerCircle.position.y) ** 2) + ballRadius;

  //If clicked inside circle, spawn a new ball
  if (distance <= innerCircle.radius) {


    balls.push(new Ball({
      x: mouseX,
      y: mouseY,
      velX: 0,
      velY: 6,
      radius: ballRadius,
      color: colors[0],
      sound: audioFiles[0],
      index: 0,
    }));
  }
}

canvas.addEventListener("mousedown", function (e) {
  getMousePosition(e);
});


// Adding an init() paired with #2 removes updating for the canvas, so the balls will trail
function init() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 300, 0, Math.PI * 2, false);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
  // balls.push(new Ball({
  //   x: canvas.width/2,
  //   y: canvas.height/2,
  //   velX: 0,
  //   velY: 6,
  //   radius: ballRadius,
  //   color: colors[0],
  //   sound: audioFiles[0],
  //   index: 0,
  // }));

}
init()

function animate() {
  requestAnimationFrame(animate);

  // #2 This removes updating for the canvas, so the balls will trail
  // ctx.fillStyle = 'black';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  // innerCircle.update();

  balls.forEach((ball) => {

    ball.update()
    ballTracking.play()
    const nextX = ball.position.x + ball.velocity.x;
    const nextY = ball.position.y + ball.velocity.y;
    //Calculate distance between balls next position and center of inner circle
    let distance = Math.sqrt((nextX - innerCircle.position.x) ** 2 + (nextY - innerCircle.position.y) ** 2) + ball.radius;

    //Check for collision with inner circle
    if (distance >= innerCircle.radius) {

      //increase ball index and change ball color
      ball.index += 1
      if (ball.index > 6) {
        ball.index = 0
      }
      ball.color = colors[ball.index]
      ball.sound = audioFiles[ball.index]
      ball.play()
      
      //Find collision angle
      const angle = (Math.atan2(ball.position.y, ball.position.x)) + (Math.PI / 2)

      // //Create new velocity for x and y
      const newVelX = ball.velocity.x * Math.cos(2 * angle) - ball.velocity.y * Math.sin(2 * angle);
      const newVelY = ball.velocity.x * Math.sin(2 * angle) + ball.velocity.y * Math.cos(2 * angle);

      ball.velocity.x = newVelX
      ball.velocity.y = newVelY

      // //Move ball away from collision point
      ball.position.x += ball.velocity.x;
      ball.position.y += ball.velocity.y;

    } else {
      //If no collision, continue moving ball
      ball.position.y += ball.velocity.y;
      ball.position.x += ball.velocity.x;
    }
  });
}

animate();
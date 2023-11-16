import Ball from "./balls.js";
import GenericObject from "./genericObject.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = ['#e81416', '#ffa500', '#faeb36', '#79c314', '#487de7', '#4b369d', '#70369d'];
const ballRadius = 40; //Radius for all balls

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
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }
}

canvas.addEventListener("mousedown", function (e) {
  getMousePosition(e);
});

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  innerCircle.update();

  balls.forEach((ball) => {
    ball.update();

    const nextX = ball.position.x + ball.velocity.x;
    const nextY = ball.position.y + ball.velocity.y;
    //Calculate distance between ball and center of inner circle
    let distance = Math.sqrt((nextX - innerCircle.position.x) ** 2 + (nextY - innerCircle.position.y) ** 2) + ball.radius;

    //Check for collision with inner circle
    if (distance >= innerCircle.radius) {

      //Filter color array to exclude current ball's color
      const filteredArray = colors.filter(element => element !== ball.color);

      //Randomly choose color from filtered color array
      const randomIndex = Math.floor(Math.random() * filteredArray.length);

      //Change ball's color
      ball.color = filteredArray[randomIndex];

      //Find collision angle
      const angle = (Math.atan2(ball.position.y, ball.position.x)) + (Math.PI / 2)
      console.log(ball.position.y, ball.position.x, angle)

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
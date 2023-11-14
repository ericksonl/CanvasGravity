const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

class Ball {
    //x y are position
    constructor({x, y, velX, velY, radius, color, mass}) {
        this.position = {
            x: x,
            y: y
        }
        this.velocity = {
            x: velX,
            y: velY
        }
        this.radius = radius
        this.color = color        
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update() {
        this.draw()
    }
}

export default Ball
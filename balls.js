const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

class Ball {
    constructor({ x, y, velX, velY, radius, color, sound, index }) {
        this.position = {
            x: x,
            y: y
        }
        this.velocity = {
            x: velX,
            y: velY
        }
        this.radius = radius
        this.index = index
        this.color = color
        this.sound = sound
    }

    play() {
        let audio = new Audio(this.sound)
        audio.play()
    }


    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.strokeStyle = "black";
        c.lineWidth = 3
        c.stroke();
        c.fill();
        c.closePath();
    }

    update() {
        this.draw()
    }
}

export default Ball
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 50
canvas.height = 50

class GenericObject {
    //x y are position
    constructor({x, y, radius, color }) {
        this.position = {
            x: x,
            y: y
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

export default GenericObject
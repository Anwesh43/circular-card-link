class CircularCardLinkComponent extends HTMLElement {
    constructor() {
        super()
        this.href = this.getAttribute('href')
        this.src = this.getAttribute('src')
        this.img = document.createElement('img')
        const shadow = this.attachShadow({mode:'open'})
        shadow.appendChild(this.img)
    }
    render() {
        const canvas = document.createElement('canvas')
        canvas.width = this.image.width
        canvas.height = this.image.height
        const w = canvas.width,h = canvas.height
        const context = canvas.getContext('2d')
        context.save()
        context.beginPath()
        context.arc(w/2,h/2,Math.max(w,h)/2,0,2*Math.PI)
        context.clip()
        context.drawImage(this.image,0,0)
        context.restore()
    }
    connectedCallback() {
        this.image = new Image()
        this.image.src = this.src
        this.image.onload = () => {
            this.render()
        }
    }
}
customElements.define('circular-card-link-component',CircularCardLinkComponent)

class ColorFilterCircle {
    constructor() {
        this.deg = 0
    }
    draw(context,radius) {
        context.save()
        context.beginPath()
        context.fillStyle = 'black'
        context.globalAlpha = 0.5
        context.lineTo(0,0)
        for(var i=0;i<deg;i++) {
            const x = radius*Math.cos(i*Math.PI/180),y = radius*Math.sin(i*Math)
            context.lineTo(x,y)
        }
        context.restore()
    }
    update(dir) {
        this.deg += dir*(360/15)
    }
    setEdgeValue(dir) {
        this.deg = 180*(1+dir)
    }
}

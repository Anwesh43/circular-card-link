const maxAnimLimit = 8
class CircularCardLinkComponent extends HTMLElement {
    constructor() {
        super()
        this.href = this.getAttribute('href')
        this.src = this.getAttribute('src')
        this.img = document.createElement('img')
        const shadow = this.attachShadow({mode:'open'})
        shadow.appendChild(this.img)
        this.animationHandler = new AnimationHandler(this)
    }
    render() {
        const canvas = document.createElement('canvas')
        canvas.width = this.image.width
        canvas.height = this.image.height
        const w = canvas.width,h = canvas.height
        if(!this.colorFilterCircle) {
            this.colorFilterCircle = new ColorFilterCircle()
        }
        const context = canvas.getContext('2d')
        context.save()
        context.beginPath()
        context.arc(w/2,h/2,Math.max(w,h)/2,0,2*Math.PI)
        context.clip()
        context.drawImage(this.image,0,0)
        context.restore()
        this.colorFilterCircle.draw(context,w/2,h/2,Math.max(w,h)/2)
        this.img.src = canvas.toDataURL()
    }
    update(dir) {
        this.colorFilterCircle.update(dir)
    }
    setEdgeValue(dir) {
        this.colorFilterCircle.setEdgeValue(dir)
    }
    connectedCallback() {
        this.image = new Image()
        this.image.src = this.src
        this.image.onload = () => {
            this.render()
        }
        this.img.onmouseover = (event) => {
            this.animationHandler.handleAnimation(1)
        }
        this.img.onmouseout = (event) => {
            this.animationHandler.handleAnimation(-1)
        }
    }
}
class ColorFilterCircle {
    constructor() {
        this.deg = 0
    }
    draw(context,cx,cy,radius) {
        context.save()
        context.translate(cx,cy)
        context.beginPath()
        context.fillStyle = 'black'
        context.globalAlpha = 0.5
        context.lineTo(0,0)
        for(var i=0;i<=this.deg;i++) {
            const x = radius*Math.cos(i*Math.PI/180),y = radius*Math.sin(i*Math.PI/180)
            context.lineTo(x,y)
        }
        context.fill()
        context.restore()
    }
    update(dir) {
        this.deg += dir*(360/maxAnimLimit)
    }
    setEdgeValue(dir) {
        this.deg = 180*(1+dir)
    }
}
class AnimationHandler {
    constructor(component) {
        this.dir = 0
        this.counter = 0
        this.component = component
    }
    start()  {
        const interval = setInterval(()=>{
            this.component.render()
            this.component.update(this.dir)
            this.counter++
            if(this.counter == maxAnimLimit+1) {
                this.counter = 0
                clearInterval(interval)
                this.component.setEdgeValue(this.dir)
                this.dir = 0
                this.component.render()
            }
        },10)
    }
    handleAnimation(dir) {
        if(this.dir == 0) {
            this.dir = dir
            this.counter = 0
            this.start()
        }
        else if(this.dir != dir){
            this.dir = dir
            this.counter = maxAnimLimit+1-this.counter
        }
    }
}
customElements.define('circular-card-link',CircularCardLinkComponent)

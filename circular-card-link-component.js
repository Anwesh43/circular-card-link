class CircularCardLinkComponent extends HTMLElement {
    constructor() {
        super()
        this.color = this.getAttribute('color')
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

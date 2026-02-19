import { useEffect, useRef } from 'react'
import './InteractiveBackground.css'

const InteractiveBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []

        const mouse = {
            x: -1000,
            y: -1000,
            radius: 150
        }

        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            color: string

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                // Autonomous movement vector
                this.vx = (Math.random() - 0.5) * 0.5 // Slow drift
                this.vy = (Math.random() - 0.5) * 0.5

                this.size = Math.random() * 2 + 1
                // Neon Cyan/Lime tint
                const isCyan = Math.random() > 0.5;
                const colorBase = isCyan ? '0, 240, 255' : '176, 251, 93';
                this.color = `rgba(${colorBase}, ${Math.random() * 0.3 + 0.1})`
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.closePath()
                ctx.fill()
            }

            update() {
                // Autonomous movement
                this.x += this.vx
                this.y += this.vy

                // Bounce off edges
                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1

                // Mouse interaction (gentle repel)
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouse.radius) {
                    const angle = Math.atan2(dy, dx)
                    const force = (mouse.radius - distance) / mouse.radius
                    const repelForce = force * 2 // Gentle push

                    this.x -= Math.cos(angle) * repelForce
                    this.y -= Math.sin(angle) * repelForce
                }
            }
        }

        const init = () => {
            particles = []
            const numberOfParticles = (canvas.width * canvas.height) / 15000 // Responsive density
            for (let i = 0; i < numberOfParticles; i++) {
                const x = Math.random() * canvas.width
                const y = Math.random() * canvas.height
                particles.push(new Particle(x, y))
            }
        }

        const connect = () => {
            if (!ctx) return
            const connectionDistance = 120

            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x
                    const dy = particles[a].y - particles[b].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        const opacityValue = 1 - (distance / connectionDistance)
                        // Neon connection lines
                        ctx.strokeStyle = `rgba(0, 240, 255, ${opacityValue * 0.2})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(particles[a].x, particles[a].y)
                        ctx.lineTo(particles[b].x, particles[b].y)
                        ctx.stroke()
                    }
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()
            }
            connect()
            animationFrameId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            init()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.x
            mouse.y = e.y
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)

        handleResize()
        animate()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas ref={canvasRef} className="interactive-background" />
    )
}

export default InteractiveBackground

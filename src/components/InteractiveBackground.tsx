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
        let time = 0

        const mouse = { x: -1000, y: -1000 }

        // Floating orbs (large, blurred gradient circles)
        interface Orb {
            x: number
            y: number
            radius: number
            vx: number
            vy: number
            color: string
        }

        let orbs: Orb[] = []

        // Grid config
        const gridSpacing = 40
        const dotRadius = 0.8

        const initOrbs = () => {
            orbs = [
                {
                    x: canvas.width * 0.2,
                    y: canvas.height * 0.3,
                    radius: 250,
                    vx: 0.15,
                    vy: 0.1,
                    color: 'rgba(37, 99, 235, 0.07)',
                },
                {
                    x: canvas.width * 0.8,
                    y: canvas.height * 0.6,
                    radius: 300,
                    vx: -0.12,
                    vy: -0.08,
                    color: 'rgba(124, 58, 237, 0.06)',
                },
                {
                    x: canvas.width * 0.5,
                    y: canvas.height * 0.8,
                    radius: 200,
                    vx: 0.08,
                    vy: -0.15,
                    color: 'rgba(37, 99, 235, 0.05)',
                },
            ]
        }

        const drawOrbs = () => {
            orbs.forEach((orb) => {
                orb.x += orb.vx
                orb.y += orb.vy

                if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) orb.vx *= -1
                if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) orb.vy *= -1

                const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
                gradient.addColorStop(0, orb.color)
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
                ctx.fill()
            })
        }

        const drawGrid = () => {
            const cols = Math.ceil(canvas.width / gridSpacing) + 1
            const rows = Math.ceil(canvas.height / gridSpacing) + 1

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * gridSpacing
                    const y = j * gridSpacing

                    // Mouse proximity glow
                    const dx = mouse.x - x
                    const dy = mouse.y - y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    const mouseRadius = 180

                    let alpha = 0.12
                    let r = dotRadius

                    if (dist < mouseRadius) {
                        const factor = 1 - dist / mouseRadius
                        alpha = 0.12 + factor * 0.35
                        r = dotRadius + factor * 1.5
                    }

                    ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`
                    ctx.beginPath()
                    ctx.arc(x, y, r, 0, Math.PI * 2)
                    ctx.fill()
                }
            }
        }

        const drawFlowLines = () => {
            const lineCount = 5
            for (let i = 0; i < lineCount; i++) {
                const yBase = (canvas.height / (lineCount + 1)) * (i + 1)
                const amplitude = 30 + i * 10
                const frequency = 0.003 + i * 0.0005
                const speed = 0.4 + i * 0.1

                ctx.beginPath()
                ctx.strokeStyle = `rgba(37, 99, 235, ${0.07 + i * 0.008})`
                ctx.lineWidth = 1

                for (let x = 0; x <= canvas.width; x += 3) {
                    const y = yBase +
                        Math.sin(x * frequency + time * speed * 0.01) * amplitude +
                        Math.sin(x * frequency * 1.8 + time * speed * 0.015 + i) * amplitude * 0.4
                    if (x === 0) {
                        ctx.moveTo(x, y)
                    } else {
                        ctx.lineTo(x, y)
                    }
                }
                ctx.stroke()
            }
        }

        const drawCrosshairs = () => {
            if (mouse.x < 0) return

            const size = 12
            const alpha = 0.15

            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`
            ctx.lineWidth = 1

            // Snap to nearest grid point
            const gx = Math.round(mouse.x / gridSpacing) * gridSpacing
            const gy = Math.round(mouse.y / gridSpacing) * gridSpacing

            // Horizontal line segment
            ctx.beginPath()
            ctx.moveTo(gx - size, gy)
            ctx.lineTo(gx + size, gy)
            ctx.stroke()

            // Vertical line segment
            ctx.beginPath()
            ctx.moveTo(gx, gy - size)
            ctx.lineTo(gx, gy + size)
            ctx.stroke()

            // Corner brackets around grid point
            const bracketSize = 6
            const offset = 10
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha * 0.6})`
            const corners = [
                [gx - offset, gy - offset],
                [gx + offset, gy - offset],
                [gx - offset, gy + offset],
                [gx + offset, gy + offset],
            ]
            corners.forEach(([cx, cy], idx) => {
                const dirX = idx % 2 === 0 ? 1 : -1
                const dirY = idx < 2 ? 1 : -1
                ctx.beginPath()
                ctx.moveTo(cx, cy + dirY * bracketSize)
                ctx.lineTo(cx, cy)
                ctx.lineTo(cx + dirX * bracketSize, cy)
                ctx.stroke()
            })
        }

        const animate = () => {
            time++
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawOrbs()
            drawFlowLines()
            drawGrid()
            drawCrosshairs()
            animationFrameId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initOrbs()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const handleMouseLeave = () => {
            mouse.x = -1000
            mouse.y = -1000
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseleave', handleMouseLeave)

        handleResize()
        animate()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseleave', handleMouseLeave)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas ref={canvasRef} className="interactive-background" />
    )
}

export default InteractiveBackground

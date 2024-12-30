'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

interface DonutChartProps {
  data: {
    token: string
    percentage: number
    color: string
  }[]
}

export function DonutChart({ data }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawChart = () => {
      // Set canvas size
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const radius = Math.min(centerX, centerY) * 0.8

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let startAngle = Math.PI; // Start from left

      data.forEach((item, index) => {
        const sliceAngle = (item.percentage / 100) * 2 * Math.PI
        const endAngle = startAngle + sliceAngle

        // Draw segment
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, endAngle)
        ctx.closePath()

        // Fill with gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
        gradient.addColorStop(0, lightenColor(item.color, 20))
        gradient.addColorStop(1, item.color)
        ctx.fillStyle = gradient

        ctx.fill()

        // Highlight hovered segment
        if (hoveredSegment === index) {
          ctx.save()
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
          ctx.shadowBlur = 10
          ctx.fillStyle = lightenColor(item.color, 10)
          ctx.fill()
          ctx.restore()
        }

        // Draw segment border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.lineWidth = 2
        ctx.stroke()

        startAngle = endAngle
      })

      // Draw center hole
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI)
      ctx.fillStyle = 'rgba(30, 58, 138, 0.8)' // Match background (blue-900 with some transparency)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Add inner shadow to the center hole
      ctx.save()
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 3
      ctx.fill()
      ctx.restore()
    }

    drawChart()

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const radius = Math.min(centerX, centerY) * 0.8

      const dx = x - centerX
      const dy = y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > radius * 0.6 && distance < radius) {
        const angle = Math.atan2(dy, dx) + Math.PI / 2
        let totalAngle = 0
        for (let i = 0; i < data.length; i++) {
          totalAngle += (data[i].percentage / 100) * 2 * Math.PI
          if (angle < totalAngle) {
            setHoveredSegment(i)
            return
          }
        }
      } else {
        setHoveredSegment(null)
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [data, hoveredSegment])

  return (
    <Card className="bg-blue-900/80 border-blue-800">
      <CardHeader>
        <CardTitle className="text-white">Pool Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square">
          <canvas 
            ref={canvasRef} 
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {data.map((item, index) => (
            <div 
              key={item.token} 
              className={`flex items-center gap-2 p-2 rounded transition-colors ${
                hoveredSegment === index ? 'bg-blue-800' : ''
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-sm text-white">{item.token}</span>
              <span className="text-sm text-gray-300 ml-auto">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function lightenColor(color: string, amount: number): string {
  return '#' + color.replace(/^#/, '').replace(/../g, color => 
    ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
  )
}


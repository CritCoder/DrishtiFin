"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { gsap } from 'gsap'

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export default function AnimatedCounter({ 
  value, 
  duration = 2, 
  suffix = '', 
  prefix = '',
  decimals = 0,
  className = '' 
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })

  useEffect(() => {
    if (isInView) {
      // GSAP animation for smooth counting
      gsap.to({ val: 0 }, {
        val: value,
        duration,
        ease: "power2.out",
        onUpdate: function() {
          setDisplayValue(this.targets()[0].val)
        }
      })
      
      // Framer Motion spring animation
      motionValue.set(value)
    }
  }, [isInView, value, duration, motionValue])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(latest)
    })
  }, [springValue])

  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    return Math.floor(num).toLocaleString()
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {prefix}{formatNumber(displayValue)}{suffix}
    </motion.span>
  )
}
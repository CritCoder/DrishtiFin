"use client"

import { useState, useCallback, createContext, useContext } from 'react'

export type NotificationStatus = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  status: NotificationStatus
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
  showEmailIndicator?: boolean
  autoClose?: boolean
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  showNotification: (notification: Omit<Notification, 'id'>) => string
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    // Fallback implementation when context is not available
    return {
      notifications: [],
      showNotification: (notification: Omit<Notification, 'id'>) => {
        // Fallback to browser alert for now
        alert(`${notification.title}: ${notification.message}`)
        return 'fallback'
      },
      removeNotification: () => {},
      clearAllNotifications: () => {}
    }
  }
  return context
}

export function useNotificationProvider() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification: Notification = {
      id,
      ...notification,
      autoClose: notification.autoClose ?? true,
      duration: notification.duration ?? 5000
    }

    setNotifications(prev => [...prev, newNotification])

    // Auto-close notification if enabled
    if (newNotification.autoClose && newNotification.duration) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    showNotification,
    removeNotification,
    clearAllNotifications
  }
}

export const NotificationProvider = NotificationContext.Provider
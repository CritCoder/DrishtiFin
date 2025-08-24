"use client"

import React from 'react'
import { useNotifications } from '@/hooks/use-notifications'
import { NotificationModal } from '@/components/notification-modal'

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications()
  
  // Show the most recent notification
  const currentNotification = notifications[notifications.length - 1]

  if (!currentNotification) {
    return null
  }

  return (
    <NotificationModal
      isOpen={true}
      onClose={() => removeNotification(currentNotification.id)}
      status={currentNotification.status}
      title={currentNotification.title}
      message={currentNotification.message}
      actionLabel={currentNotification.actionLabel}
      onAction={currentNotification.onAction}
      showEmailIndicator={currentNotification.showEmailIndicator}
    />
  )
}
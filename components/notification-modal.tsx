"use client"

import React from 'react'
import { CheckCircle, AlertCircle, XCircle, Info, X, Mail, Clock } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export type NotificationStatus = 'success' | 'error' | 'warning' | 'info'

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  status: NotificationStatus
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
  showEmailIndicator?: boolean
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    iconColor: 'text-green-600',
    borderColor: 'border-green-200',
    titleColor: 'text-green-900',
    messageColor: 'text-green-700'
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-gradient-to-br from-red-50 to-rose-50',
    iconColor: 'text-red-600',
    borderColor: 'border-red-200',
    titleColor: 'text-red-900',
    messageColor: 'text-red-700'
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50',
    iconColor: 'text-yellow-600',
    borderColor: 'border-yellow-200',
    titleColor: 'text-yellow-900',
    messageColor: 'text-yellow-700'
  },
  info: {
    icon: Info,
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    titleColor: 'text-blue-900',
    messageColor: 'text-blue-700'
  }
}

export function NotificationModal({
  isOpen,
  onClose,
  status,
  title,
  message,
  actionLabel,
  onAction,
  showEmailIndicator = false
}: NotificationModalProps) {
  const config = statusConfig[status]
  const IconComponent = config.icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center pb-0">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 text-center`}>
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center ${config.borderColor} border`}>
              <IconComponent className={`w-8 h-8 ${config.iconColor}`} />
            </div>
          </div>

          {/* Title */}
          <DialogTitle className={`text-xl font-bold mb-3 ${config.titleColor}`}>
            {title}
          </DialogTitle>

          {/* Message */}
          <p className={`text-base leading-relaxed mb-4 ${config.messageColor}`}>
            {message}
          </p>

          {/* Email Indicator */}
          {showEmailIndicator && (
            <div className={`flex items-center justify-center gap-2 text-sm ${config.messageColor} mb-4 p-3 bg-white/50 rounded-lg`}>
              <Mail className="w-4 h-4" />
              <span>Confirmation email sent</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>Check your inbox</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            {onAction && actionLabel && (
              <Button
                onClick={onAction}
                className={`
                  ${status === 'success' ? 'bg-green-600 hover:bg-green-700' : ''}
                  ${status === 'error' ? 'bg-red-600 hover:bg-red-700' : ''}
                  ${status === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
                  ${status === 'info' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  text-white font-semibold px-6
                `}
              >
                {actionLabel}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6 font-semibold"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hook for easier usage
export function useNotificationModal() {
  const [notification, setNotification] = React.useState<{
    isOpen: boolean
    status: NotificationStatus
    title: string
    message: string
    actionLabel?: string
    onAction?: () => void
    showEmailIndicator?: boolean
  }>({
    isOpen: false,
    status: 'info',
    title: '',
    message: ''
  })

  const showNotification = (props: Omit<typeof notification, 'isOpen'>) => {
    setNotification({ ...props, isOpen: true })
  }

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }))
  }

  const NotificationComponent = () => (
    <NotificationModal
      {...notification}
      onClose={hideNotification}
    />
  )

  return {
    showNotification,
    hideNotification,
    NotificationComponent
  }
}
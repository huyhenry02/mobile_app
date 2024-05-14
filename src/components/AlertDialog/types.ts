import React from "react"

export interface AlertDialogProps {
  visible: boolean
  onDismiss: () => void
  title: string
  content: string
  children?: React.ReactNode
}

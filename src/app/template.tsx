import React from 'react'
import styles from './template.module.css'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function Template({
  children,
  className = '',
}: PageWrapperProps) {
  return <div className={`${styles.page} ${className}`}>{children}</div>
}

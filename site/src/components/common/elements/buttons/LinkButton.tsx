import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../core'

export interface LinkButtonProps {
    to: string
    label: String
    className?: String
    variant?: 'text' | 'contained'
    color?: 'default' | 'inherit' | 'primary' | 'secondary'
}

const LinkButton: React.FC<LinkButtonProps> = ({ to, label, className, variant, color }) => (
  <div className={className ? `Link-Button ${className}` : 'Link-Button'}>
    <Link to={to}>
      <Button variant={variant || 'outlined'} color={color}>
        {label}
      </Button>
    </Link>
  </div>
)

export default LinkButton

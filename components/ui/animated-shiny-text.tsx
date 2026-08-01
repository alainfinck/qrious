import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type FC,
} from 'react'

import { cn } from '@/lib/utils'

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<'span'> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          '--shiny-width': `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        'mx-auto max-w-md text-neutral-600/70',
        'animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%]',
        'bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

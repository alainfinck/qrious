import React, { type ComponentPropsWithoutRef, type CSSProperties } from 'react'

import { Link } from '@/src/i18n/routing'
import { cn } from '@/lib/utils'

type ShimmerVisualProps = {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

type ShimmerAsButton = ShimmerVisualProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'color'> & {
    href?: undefined
  }

type ShimmerAsLink = ShimmerVisualProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'color' | 'type' | 'onClick'> & {
    /** Rend un Link next-intl (évite <a><button> invalide). */
    href: string
  }

export type ShimmerButtonProps = ShimmerAsButton | ShimmerAsLink

function shimmerStyle({
  shimmerColor,
  shimmerSize,
  shimmerDuration,
  borderRadius,
  background,
}: Required<
  Pick<
    ShimmerVisualProps,
    'shimmerColor' | 'shimmerSize' | 'shimmerDuration' | 'borderRadius' | 'background'
  >
>): CSSProperties {
  return {
    '--spread': '90deg',
    '--shimmer-color': shimmerColor,
    '--radius': borderRadius,
    '--speed': shimmerDuration,
    '--cut': shimmerSize,
    '--bg': background,
  } as CSSProperties
}

function ShimmerChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none -z-30 blur-[2px]',
          '@container-[size] absolute inset-0 overflow-visible',
        )}
      >
        <div className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]">
          <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>
      <span className="relative z-10">{children}</span>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 size-full',
          'rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]',
          'transform-gpu transition-all duration-300 ease-in-out',
          'group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]',
          'group-active:shadow-[inset_0_-10px_10px_#ffffff3f]',
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)]"
      />
    </>
  )
}

const shellClass =
  'group relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)] transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px'

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(0, 0, 0, 1)',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const style = shimmerStyle({
      shimmerColor,
      shimmerSize,
      shimmerDuration,
      borderRadius,
      background,
    })
    const classes = cn(shellClass, className)

    if ('href' in props && props.href) {
      const { href, ...rest } = props
      // Drop button-only leftovers if any were passed
      const {
        type: _type,
        disabled: _disabled,
        ...linkSafe
      } = rest as ComponentPropsWithoutRef<'button'>
      return (
        <Link href={href} className={classes} style={style} {...(linkSafe as object)}>
          <ShimmerChrome>{children}</ShimmerChrome>
        </Link>
      )
    }

    const buttonProps = props as ComponentPropsWithoutRef<'button'>
    return (
      <button style={style} className={classes} ref={ref} {...buttonProps}>
        <ShimmerChrome>{children}</ShimmerChrome>
      </button>
    )
  },
)

ShimmerButton.displayName = 'ShimmerButton'

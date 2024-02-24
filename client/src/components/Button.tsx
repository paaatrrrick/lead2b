import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-xl py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-xl py-2 px-4 text-sm focus:outline-none',
}

const variantStyles = {
  solid: {
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
    brandColor: 'bg-brandColor-600 text-white hover:text-slate-100 hover:bg-brandColor-500 active:bg-brandColor-800 active:text-brandColor-100 focus-visible:outline-brandColor-600',
    white:
      'bg-white text-slate-900 hover:bg-brandColor-50 active:bg-brandColor-200 active:text-slate-600 focus-visible:outline-white',
  },
  outline: {
    slate:
      'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-brandColor-600 focus-visible:ring-slate-300',
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
     brandColor:
      'ring-brandColor-600 text-brandColor-600 hover:ring-brandColor-500 active:ring-brandColor-800 active:text-brandColor-100 focus-visible:outline-brandColor-600', 
  },
}

type ButtonProps = {
  variant?: 'solid' | 'outline',
  color?: 'slate' | 'brandColor' | 'white',
  className?: string,
  href?: string,
  [key: string]: any,
}


export function Button({ variant = 'solid', color = 'brandColor', className, ...props } : ButtonProps) {
  className = clsx(
    baseStyles[variant],
    //@ts-ignore
    variantStyles[variant][color],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    //@ts-ignore
    <Link className={className} {...props} />
  )
}

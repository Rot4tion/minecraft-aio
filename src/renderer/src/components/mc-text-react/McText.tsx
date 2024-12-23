import React from 'react'
import { cn } from '@renderer/lib/utils'
import defaultColormap, { ColorMap } from './defaultColormap'
import convertTextToJson from './textToJson'
import TextComponent from './TextComponent'
import { isString } from './util'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const mcTextVariants = cva('font-mono', {
  variants: {
    variant: {
      default: '',
      outline: 'text-stroke-2',
      shadow: 'text-shadow-md'
    },
    size: {
      default: 'text-base',
      xs: 'text-xs',
      sm: 'text-sm',
      lg: 'text-lg',
      xl: 'text-xl'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

export interface McTextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof mcTextVariants> {
  children?: string | { text: string; extra: any[] }
  colormap?: ColorMap
  randomChars?: string
  prefix?: string
  asChild?: boolean
  style?: React.CSSProperties
}

const McText = React.forwardRef<HTMLSpanElement, McTextProps>(
  (
    {
      prefix = '§',
      children,
      colormap = defaultColormap,
      randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!§$%&?#',
      className,
      variant,
      size,
      asChild = false,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'span'
    const component = isString(children) ? convertTextToJson(children, prefix) : children

    return (
      <Comp
        ref={ref}
        className={cn(mcTextVariants({ variant, size, className }))}
        style={style}
        {...props}
      >
        <TextComponent colormap={colormap} component={component || ''} randomChars={randomChars} />
      </Comp>
    )
  }
)

McText.displayName = 'McText'

export { McText, mcTextVariants }

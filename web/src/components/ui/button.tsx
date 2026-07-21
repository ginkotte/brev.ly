import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import {Slot} from '@radix-ui/react-slot'

const buttonVariants = tv({
  base:
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",

  variants: {
    variant: {
      primary: "bg-blue-base text-white hover:bg-blue-base/80",
      secondary: "bg-gray-200 text-gray-500 hover:text-gray-500/50 hover:bg-gray-200/50",
      danger: "bg-danger text-white hover:opacity-90",
    },

    size: {
      default: "h-12 px-4",
      icon: "h-10 w-full",
      "icon-sm": "h-8 w-8",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean
}

export function Button({variant, size, className, asChild, ...props}: ButtonProps) {
    const Component = asChild ? Slot : 'button'

    return(
        <Component className={buttonVariants({variant, size, className})} {...props}/>
    )
}
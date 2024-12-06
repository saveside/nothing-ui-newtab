import { Icon } from "@iconify/react"
import { type VariantProps, cva } from "class-variance-authority"
import React from "react"
import { cn } from "../../utils"

const buttonVariants = cva(
  "button active:scale-95 flex size-12 items-center justify-center rounded-xl",
  {
    variants: {
      variant: {
        primary: "bg-card text-card-foreground hover:bg-card-foreground/20",
        secondary: "bg-background text-foreground hover:bg-foreground/20",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
      size: {
        default: "px-3 py-2",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: string
  iconSize?: number
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type, className, children, variant, size, icon, iconSize, ...props },
    ref,
  ) => {
    return (
      <button
        type={type || "button"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon && <Icon icon={icon} fontSize={iconSize} />}
        {children}
      </button>
    )
  },
)

Button.displayName = "button"

export default Button

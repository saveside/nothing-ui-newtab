import { type VariantProps, cva } from "class-variance-authority"
import React from "react"
import { cn } from "../../utils"
import AppIcon from "./app-icon"

const buttonVariants = cva(
  "button active:scale-95 flex items-center justify-center rounded-xl transition-colors duration-300 gap-1 disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-card text-card-foreground hover:bg-card-hover",
        secondary: "bg-background text-foreground hover:bg-card-foreground/10",
        accent: "bg-foreground text-background",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
      size: {
        default: "px-4 h-10",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: string
  iconSize?: number
  customIconComp?: React.ReactNode
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
        {icon && <AppIcon icon={icon} iconSize={iconSize} />}
        {children}
      </button>
    )
  },
)

Button.displayName = "button"

export default Button

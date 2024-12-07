import { type VariantProps, cva } from "class-variance-authority"
import React from "react"
import { cn } from "../../utils"

const input = cva(
  "w-full py-2 border-none rounded-xl px-4 focus:outline-none focus:ring-2 disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground focus:ring-foreground placeholder:text-foreground placeholder:opacity-60",
        secondary: "bg-card text-card-foreground focus:ring-foreground",
      },
      outline: {
        ghost: "focus:ring-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {
  isError?: boolean
  errorTxt?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, variant, outline, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(input({ variant, outline, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = "Input"

export default Input

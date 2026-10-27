import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
    decorative: {
      true: "",
      false: "bg-transparent",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    decorative: true,
  },
})

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation, decorative, ...props }, ref) => (
    <div
      ref={ref}
      role={decorative ? "separator" : undefined}
      aria-orientation={decorative ? (orientation ?? "horizontal") : undefined}
      className={cn(separatorVariants({ orientation, decorative }), className)}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

export { Separator }
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-fit",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-xl",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
        // FitSnap custom variants
        primary: "fit-gradient-primary text-primary-foreground shadow-fit-lg hover:scale-[1.02] active:scale-[0.98] rounded-xl",
        "primary-pill": "fit-gradient-primary text-primary-foreground shadow-fit-lg hover:scale-[1.02] active:scale-[0.98] rounded-full",
        "secondary-pill": "bg-card border border-border text-foreground hover:bg-muted rounded-full",
        warm: "fit-gradient-warm text-accent-foreground shadow-fit hover:scale-[1.02] active:scale-[0.98] rounded-xl",
        "warm-soft": "bg-accent/10 text-accent-foreground border border-accent/20 hover:bg-accent/20 rounded-xl",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-fit rounded-xl",
        fab: "fit-gradient-primary text-primary-foreground shadow-xl hover:scale-105 active:scale-95 rounded-full",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-3.5 text-xs min-h-[36px]",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-base font-semibold",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9 min-h-[36px] min-w-[36px]",
        "icon-lg": "h-14 w-14",
        fab: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

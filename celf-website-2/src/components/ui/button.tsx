import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary CELF button - bright green background
        primary:
          "bg-[#9EFF00] text-black hover:bg-[#7ACC00] hover:-translate-y-0.5 transition-all duration-300 font-semibold shadow-[0_0_20px_rgba(158,255,0,0.3)] hover:shadow-[0_0_30px_rgba(158,255,0,0.5)]",

        // Secondary CELF button - outlined green
        secondary:
          "border-2 border-[#9EFF00] text-[#9EFF00] bg-transparent hover:bg-[#9EFF00] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(158,255,0,0.2)]",

        // Ghost button for subtle actions
        ghost:
          "text-white hover:text-[#9EFF00] hover:bg-gray-800/50 transition-all duration-300",

        // Destructive for dangerous actions
        destructive:
          "bg-red-500 text-white hover:bg-red-600 transition-all duration-normal",

        // Link style
        link: "text-brand-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-celf-md px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

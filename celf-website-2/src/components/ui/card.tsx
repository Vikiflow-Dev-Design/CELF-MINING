import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "featured" | "blog" | "team" | "pricing";
    hover?: boolean;
  }
>(({ className, variant = "default", hover = true, ...props }, ref) => {
  const baseClasses =
    "rounded-celf-lg backdrop-blur-celf transition-all duration-normal";

  const variantClasses = {
    default:
      "bg-gray-900/80 border border-[#9EFF00]/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 backdrop-blur-sm",
    featured:
      "bg-gray-900/80 border border-[#9EFF00] shadow-[0_8px_32px_rgba(158,255,0,0.2)] p-6 backdrop-blur-sm",
    blog: "bg-gray-900/80 border border-gray-700 overflow-hidden hover:border-[#9EFF00]/50 backdrop-blur-sm",
    team: "bg-gray-900/80 border border-gray-700 p-5 hover:bg-gray-800/80 backdrop-blur-sm",
    pricing: "bg-gray-900/80 border border-gray-700 p-8 backdrop-blur-sm",
  };

  const hoverClasses = hover
    ? "hover:shadow-[0_12px_48px_rgba(158,255,0,0.1)] hover:-translate-y-1 hover:border-[#9EFF00]/40"
    : "";

  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        className
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    variant?: "default" | "hero" | "stat";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "text-xl font-semibold text-white",
    hero: "text-5xl lg:text-7xl font-bold text-white leading-tight",
    stat: "text-5xl font-bold text-[#9EFF00]",
  };

  return (
    <h3
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-gray-300 leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// CELF-specific card components
const IconCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon: React.ReactNode;
    title: string;
    description: string;
  }
>(({ className, icon, title, description, ...props }, ref) => (
  <Card ref={ref} className={cn("text-center", className)} {...props}>
    <div className="bg-card-glow rounded-celf-md p-icon mb-4 w-12 h-12 mx-auto flex items-center justify-center">
      <div className="text-brand-primary text-2xl">{icon}</div>
    </div>
    <CardTitle className="mb-2">{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </Card>
));
IconCard.displayName = "IconCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  IconCard,
};

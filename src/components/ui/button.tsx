
import { cn } from "../library/utils"; // make sure utils.ts exports a `cn` function
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Button = ({ variant = "default", size = "md", className, ...props }: ButtonProps) => {
  const base = "rounded px-3 py-2 transition text-sm";

  const variants = {
    default: "bg-primary text-primary-foreground",
    ghost: "bg-transparent hover:bg-accent text-muted-foreground",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "text-xs h-8",
    md: "text-sm h-10",
    lg: "text-base h-12",
  };

  return (
    <button
      type="button" 
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};

export default Button;

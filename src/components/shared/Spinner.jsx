import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Spinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-16 w-16',
  };

  return (
    <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
  );
}
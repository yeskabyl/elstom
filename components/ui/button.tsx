import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-transparent font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-200 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/35 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-ink text-white hover:bg-ink-soft",
        outline: "border-ink/20 bg-transparent text-ink hover:border-ink/40 hover:bg-white",
        subtle: "bg-aqua-soft text-ink hover:bg-[#d3ebe7]",
        ghost: "text-ink hover:bg-mist",
        light: "bg-white text-ink hover:bg-cream",
        "outline-light": "border-white/30 text-white hover:border-white/60 hover:bg-white/5",
        link: "h-auto px-0 text-teal underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-5 text-[0.94rem]",
        lg: "h-14 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };

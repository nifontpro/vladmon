/* eslint-disable react-refresh/only-export-components */
import { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';

export const buttonVariants = cva('cerk-btn', {
  variants: {
    variant: {
      primary: '',
      secondary: 'cerk-btn--secondary',
      ghost: 'cerk-btn--ghost',
      rubric: 'cerk-btn--rubric',
      gold: 'cerk-btn--gold',
    },
    size: {
      sm: 'cerk-btn--sm',
      md: '',
      lg: 'cerk-btn--lg',
      xl: 'cerk-btn--xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonVariants &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: never;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    />
  );
});

type LinkButtonProps = ButtonVariants &
  LinkProps & { className?: string };

export function LinkButton({ className, variant, size, ...rest }: LinkButtonProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...rest} />;
}

type AnchorButtonProps = ButtonVariants &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function AnchorButton({ className, variant, size, ...rest }: AnchorButtonProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...rest} />;
}

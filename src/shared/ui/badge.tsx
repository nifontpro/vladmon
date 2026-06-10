import { cn } from '@/shared/lib/cn';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'rubric' | 'lapis' | 'gold' | 'emerald' | 'outline';
  withDot?: boolean;
};

const VARIANT: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: '',
  rubric: 'cerk-badge--rubric',
  lapis: 'cerk-badge--lapis',
  gold: 'cerk-badge--gold',
  emerald: 'cerk-badge--emerald',
  outline: 'cerk-badge--outline',
};

export function Badge({
  variant = 'default',
  withDot,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span className={cn('cerk-badge', VARIANT[variant], className)} {...rest}>
      {withDot && <span className="dot" />}
      {children}
    </span>
  );
}

import { cn } from '@/shared/lib/cn';

type DropcapProps = React.HTMLAttributes<HTMLSpanElement>;

export function Dropcap({ className, children, ...rest }: DropcapProps) {
  return (
    <span className={cn('dropcap', className)} aria-hidden="true" {...rest}>
      {children}
    </span>
  );
}

type RubricProps = React.HTMLAttributes<HTMLSpanElement>;

export function Rubric({ className, children, ...rest }: RubricProps) {
  return (
    <span className={cn('rubric', className)} {...rest}>
      {children}
    </span>
  );
}

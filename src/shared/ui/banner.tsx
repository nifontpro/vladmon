import { Icon, type IconName } from '@/shared/icons/sprite';
import { cn } from '@/shared/lib/cn';

type BannerProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'rubric' | 'lapis' | 'gold' | 'emerald';
  title?: React.ReactNode;
  icon?: IconName;
};

const VARIANT_CLS: Record<NonNullable<BannerProps['variant']>, string> = {
  rubric: '',
  lapis: 'lapis',
  gold: 'gold',
  emerald: 'emerald',
};

const DEFAULT_ICON: Record<NonNullable<BannerProps['variant']>, IconName> = {
  rubric: 'i-warning',
  lapis: 'i-info',
  gold: 'i-bell',
  emerald: 'i-check',
};

export function Banner({
  variant = 'lapis',
  icon,
  title,
  className,
  children,
  ...rest
}: BannerProps) {
  const iconName = icon ?? DEFAULT_ICON[variant];
  return (
    <div className={cn('cerk-banner', VARIANT_CLS[variant], className)} role="status" {...rest}>
      <Icon name={iconName} size={20} className="icon" />
      <div>
        {title && (
          <strong style={{ display: 'block', marginBottom: 4 }}>{title}</strong>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}

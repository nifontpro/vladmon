import { cn } from '@/shared/lib/cn';

export type TabItem<T extends string = string> = {
  value: T;
  label: React.ReactNode;
};

type TabsProps<T extends string> = {
  items: ReadonlyArray<TabItem<T>>;
  value: T;
  onChange: (v: T) => void;
  className?: string;
  ariaLabel?: string;
};

export function Tabs<T extends string>({
  items,
  value,
  onChange,
  className,
  ariaLabel,
}: TabsProps<T>) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={cn('cerk-tabs', className)}>
      {items.map((it) => {
        const selected = it.value === value;
        return (
          <button
            key={it.value}
            role="tab"
            type="button"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(it.value)}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

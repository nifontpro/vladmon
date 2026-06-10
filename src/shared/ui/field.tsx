import { forwardRef, useId } from 'react';
import { cn } from '@/shared/lib/cn';

type FieldProps = {
  label?: string;
  required?: boolean;
  helper?: string;
  error?: string;
  className?: string;
  children: (id: string, ariaInvalid: boolean) => React.ReactNode;
};

export function Field({ label, required, helper, error, className, children }: FieldProps) {
  const id = useId();
  const ariaInvalid = Boolean(error);
  return (
    <div className={cn('cerk-field', className)}>
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span className="req">*</span>}
        </label>
      )}
      {children(id, ariaInvalid)}
      {error ? (
        <span className="error">{error}</span>
      ) : helper ? (
        <span className="helper">{helper}</span>
      ) : null}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...rest }, ref) {
    return <input ref={ref} className={cn('cerk-input', className)} {...rest} />;
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...rest }, ref) {
  return <textarea ref={ref} className={cn('cerk-textarea', className)} {...rest} />;
});

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...rest }, ref) {
    return (
      <select ref={ref} className={cn('cerk-select', className)} {...rest}>
        {children}
      </select>
    );
  },
);

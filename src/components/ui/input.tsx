import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        style={{
          boxShadow: 'none',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--primary-brand)';
          e.target.style.boxShadow = '0 0 0 1px var(--primary-brand)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '';
          e.target.style.boxShadow = 'none';
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };

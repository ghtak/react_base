import React from 'react';
import styles from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, fullWidth = true, style, ...props }, ref) => {
    return (
      <div className={styles.container} style={{ width: fullWidth ? '100%' : 'auto', ...style }}>
        {label && <label htmlFor={props.id}>{label}</label>}
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            className={`${styles.input} ${error ? styles.error : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <span className={`${styles.helperText} ${styles.error}`}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

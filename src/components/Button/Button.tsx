import { useMemo } from 'react';
import {
  composeRenderProps,
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import styles from './Button.module.css';

interface ButtonProps extends RACButtonProps {
  variant?: 'primary';
}

const Button = (props: ButtonProps) => {
  const { children, variant } = props;

  const classes = useMemo(() => {
    const baseClass = styles.button;

    switch (variant) {
      case 'primary':
        return `${baseClass} ${styles.primary}`;
      default:
        return `${baseClass} ${styles.primary}`;
    }
  }, [variant]);

  return (
    <RACButton
      {...props}
      className={classes}
      data-variant={variant || 'primary'}
    >
      {composeRenderProps(children, (children, { isPending }) => (
        <>
          {!isPending && children}
          {isPending && (
            <LoadingSpinner aria-label="Saving..." isIndeterminate />
          )}
        </>
      ))}
    </RACButton>
  );
};

export { Button };

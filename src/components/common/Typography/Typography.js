import React from 'react';
import cn from 'classnames';
import './Typography.css';

const variants = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  div: 'div',
};
const Typography = ({ variant, className, size, align, ...props }) => {
  const Component = variants[variant] || 'p';
  return (
    <Component
      className={cn('Typography', className, {
        [`Typography--${size}`]: true,
        [`Typography--${align}`]: true,
      })}
      {...props}
    />
  );
};

Typography.defaultProps = {
  size: 'sm',
  align: 'center',
};
export default Typography;

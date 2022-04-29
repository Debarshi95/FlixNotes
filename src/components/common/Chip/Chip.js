import cn from 'classnames';
import { memo } from 'react';
import { Typography } from 'components';
import './Chip.css';

const Chip = ({ children, className, variant, icon, onClick, ...props }) => {
  return (
    <div
      className={cn('Chip__root d-flex items-center content-between', className, {
        [`Chip--${variant}`]: true,
      })}
      {...props}
    >
      <Typography
        variant="h6"
        size="xs"
        className="Chip--Text Typography--500"
        align={icon ? 'start' : 'center'}
      >
        {children}
      </Typography>
      <div role="button" aria-hidden className="Chip__icon" onClick={() => onClick(children)}>
        {icon}
      </div>
    </div>
  );
};

Chip.defaultProps = {
  onClick: null,
  icon: null,
  children: '',
  variant: 'outlined',
};
export default memo(Chip);

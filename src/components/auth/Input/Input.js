import React from 'react';
import cn from 'classnames';
import { useField } from 'formik';
import './Input.css';

const Input = ({ hasLabel, className, label, ...props }) => {
  const [field, meta] = useField(props);

  const InputComp = (
    <>
      <input className={cn('Input__root', className)} {...field} {...props} />
      {meta.touched && meta.error ? <div className="Input__error">{meta.error}</div> : null}
    </>
  );

  return hasLabel ? (
    <>
      <label htmlFor={props.id || props.name} className="Input__label">
        {label}
      </label>
      {InputComp}
    </>
  ) : (
    InputComp
  );
};

Input.defaultProps = {
  type: 'text',
  hasLabel: false,
  label: '',
};

export default Input;

import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { selectInputStyles } from 'styles/defaultStyles';

const selectVariants = {
  creatable: CreatableSelect,
  primary: Select,
};

const SelectInput = ({ onSelectCreate, variant, onSelectClick, options, ...props }) => {
  const styles = selectInputStyles({ ...props });
  const Component = selectVariants[variant];

  const handleOnCreate = (value) => {
    if (onSelectCreate) {
      onSelectCreate(value);
    }
  };

  const handleOnChange = ({ value, label }) => {
    if (onSelectClick) {
      onSelectClick({ label, value });
    }
  };

  return (
    <Component
      styles={styles}
      options={options}
      onCreateOption={handleOnCreate}
      onChange={handleOnChange}
      {...props}
    />
  );
};

SelectInput.defaultProps = {
  onSelectCreate: null,
  onSelectClick: null,
  options: [],
  variant: 'primary',
  selectStyles: {},
};
export default SelectInput;

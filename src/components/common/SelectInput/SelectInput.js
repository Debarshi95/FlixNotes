import CreatableSelect from 'react-select/creatable';
import { selectInputStyles } from 'styles/defaultStyles';

const SelectInput = ({ onCreate, userId, onClick, options, ...props }) => {
  const styles = selectInputStyles({ ...props });

  const handleCreateLabel = async (value) => {
    if (onCreate) {
      onCreate(value);
    }
  };

  const handleOnChange = ({ value }) => {
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <div>
      <CreatableSelect
        styles={styles}
        placeholder="Label"
        options={options}
        onCreateOption={handleCreateLabel}
        onChange={handleOnChange}
      />
    </div>
  );
};

SelectInput.defaultProps = {
  onCreate: null,
  onClick: null,
  options: [],
};
export default SelectInput;

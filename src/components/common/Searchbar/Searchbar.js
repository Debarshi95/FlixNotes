import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { useRef, useState } from 'react';
import { Button, SelectInput, Typography } from 'components';
import { useTagContext, useNoteFilterContext } from 'providers';
import {
  defaultFilterOptions,
  DROPDOWN_CLEAR,
  DROPDOWN_PINNED,
  DROPDOWN_PRIORITY,
  DROPDOWN_STATUS,
  DROPDOWN_TAGS,
  priorityOptions,
  statusOptions,
} from 'constants/dropdownOptions';
import './Searchbar.css';
import { toCapitalize } from 'utils/helper-funcs';

const Searchbar = () => {
  const [select, setSelect] = useState(null);
  const { tags = [] } = useTagContext();
  const { dispatch } = useNoteFilterContext();

  const ref = useRef('All Notes');

  const handleSelect = ({ label }) => {
    let type = ref.current?.toUpperCase();
    if (label === 'Clear') {
      type = label.toUpperCase();
    }
    if (ref.current === 'Priority') {
      type = 'SORT_BY';
    }
    dispatch({ type, payload: label });
  };

  const handleMainSelect = ({ value, label }) => {
    ref.current = toCapitalize(value);

    setSelect(label);
    if (label === DROPDOWN_CLEAR) {
      return dispatch({ type: 'CLEAR', payload: null });
    }

    if (label === DROPDOWN_PINNED) {
      return dispatch({ type: 'PINNED' });
    }

    if (label !== DROPDOWN_STATUS && label !== DROPDOWN_PRIORITY) {
      dispatch({ type: 'TAGS', payload: label?.toLowerCase() });
    }

    return null;
  };
  const handleSearch = (e) => {
    dispatch({ type: 'SEARCH', payload: e.target.value });
  };

  return (
    <div className="Searchbar__root">
      <Button variant="icon" component="div" className="SearchIcon">
        <FiSearch />
      </Button>
      <input type="text" placeholder="Search" onChange={handleSearch} />
      <div>
        <Button
          variant="text"
          className="Searchbar__button"
          onClick={() => setSelect(select === DROPDOWN_TAGS ? null : DROPDOWN_TAGS)}
        >
          <Typography variant="p">{ref.current}</Typography>
          <IoIosArrowDown />
        </Button>
        {select === DROPDOWN_TAGS && (
          <SelectInput
            onSelectClick={handleMainSelect}
            options={[...defaultFilterOptions, ...tags]}
            variant="primary"
            defaultMenuIsOpen
            placeholder={false}
            isSearchable={false}
            components={{ Control: () => null }}
            selectStyles={{ menuWidth: '8rem' }}
          />
        )}
        {select === DROPDOWN_PRIORITY && (
          <SelectInput
            onSelectClick={handleSelect}
            options={priorityOptions}
            variant="primary"
            defaultMenuIsOpen
            placeholder={false}
            isSearchable={false}
            components={{ Control: () => null }}
            selectStyles={{ menuWidth: '8rem' }}
          />
        )}
        {select === DROPDOWN_STATUS && (
          <SelectInput
            onSelectClick={handleSelect}
            options={statusOptions}
            variant="primary"
            defaultMenuIsOpen
            placeholder={false}
            isSearchable={false}
            components={{ Control: () => null }}
            selectStyles={{ menuWidth: '8rem' }}
          />
        )}
      </div>
    </div>
  );
};

export default Searchbar;

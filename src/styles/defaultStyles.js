const circleDropDownColors = [
  '#D1FAE5',
  '#FFF',
  '#FDF3C7',
  '#EFF0F2',
  '#FAF0E6',
  '#FFF8DC',
  '#98FB98',
];

const colors = {
  colorPrimary: '#ec6b44',
  colorMainBg: '#f5f5f5',
  colorTextDark: '#1a1919',
  colorTextWhite: '#f1f1f1',
  colorPrimaryDisabled: '#fc8763',
  colorDanger: '#cc4e59',
  colorBoxShadow: 'rgba(0, 0, 0, 0.16)',
};

const selectInputStyles = ({ selectStyles }) => ({
  container: (provided) => ({
    ...provided,
    fontSize: '0.85rem',
    color: colors.colorTextDark,
    width: selectStyles.menuWidth ? `${selectStyles.menuWidth}px` : '110px',
    ...selectStyles,
  }),
  option: (provided) => ({
    ...provided,
    padding: '6px 4px',
    color: 'inherit',
    cursor: 'pointer',
  }),
  control: (provided) => ({
    ...provided,
    borderColor: colors.colorBoxShadow,
    width: 'inherit',
    minHeight: 34,
    boxShadow: 'none',
    backgroundColor: 'inherit',
    color: colors.colorTextDark,
    '&:hover': {
      borderColor: colors.colorBoxShadow,
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 4px',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '4px',
  }),
  menu: (provided) => ({
    ...provided,
    fontFamily: 'inherit',
    margin: '2px 0',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '4px 6px',
  }),
});

const selectCommonStyles = {
  menuWidth: 140,
  position: 'absolute',
  top: '26px',
  left: '10px',
  background: '#fff',
  borderRadius: '4px',
  zIndex: 1,
};

export { circleDropDownColors, selectCommonStyles, selectInputStyles, colors };

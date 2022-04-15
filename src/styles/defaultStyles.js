const circlePopperStyles = {
  position: 'absolute',
  width: '5rem',
  bottom: '-130px',
  background: '#0d0d0d',
  borderRadius: '4px',
};

const circlePopperColors = ['#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#F5f5f5', '#cc4e59'];

const colors = {
  colorPrimary: '#ec6b44',
  colorMainBg: '#f5f5f5',
  colorTextDark: '#1a1919',
  colorTextWhite: '#f1f1f1',
  colorPrimaryDisabled: '#fc8763',
  colorDanger: '#cc4e59',
  colorBoxShadow: 'rgba(0, 0, 0, 0.16)',
};

const selectInputStyles = () => ({
  container: (provided) => ({
    ...provided,
    fontSize: '0.85rem',
    color: colors.colorTextDark,
  }),
  option: (provided) => ({
    ...provided,
    padding: '6px 4px',
    color: 'inherit',
    cursor: 'pointer',
  }),
  control: (provided) => ({
    ...provided,
    borderColor: 'none',
    width: 110,
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'none',
    },
  }),
  menu: (provided) => ({
    ...provided,
    fontFamily: 'inherit',
    margin: '2px 0',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
});

export { circlePopperStyles, circlePopperColors, selectInputStyles, colors };

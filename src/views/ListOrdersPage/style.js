export const styleMainSelect = {
  container: (base) => ({
    ...base,
    width: 150,
    minHeight: 35,
    height: 35
  }),
  control: (base) => ({
    ...base,
    minHeight: 35,
    height: 35,
    padding: 0,
    backgroundColor: '#1e1e1e',
    borderColor: '#ffffff24',
    color: '#ffffff24'
  }),
  valueContainer: (base) => ({
    ...base,
    height: 35,
    padding: '0px 8px',
    display: 'flex',
    alignItems: 'center'
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: 35
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#2172ef' : state.isFocused ? '#2a2a2a' : 'transparent',
    color: state.isSelected ? '#e0e0e0' : '#e0e0e0',
    cursor: 'pointer'
  }),

  singleValue: (base) => ({
    ...base,
    color: '#9e9e9e',
    fontSize: '12px',
    lineHeight: '12px',
    marginTop: '0px',
    marginBottom: '2px',
    overflow: 'hidden'
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#333333',
    borderRadius: 8,
    overflow: 'hidden'
  })
};

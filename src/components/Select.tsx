import {ComponentProps} from 'react';
import ReactSelect from 'react-select';

export type SelectProps = ComponentProps<ReactSelect>;

const Select = (props: SelectProps) => (
  <ReactSelect
    {...props}
    theme={theme => ({
      ...theme,
      colors: {
        primary: 'var(--color-text-link)',
        primary25: '#70B7FF',
        primary50: '#A0CFFF',
        primary75: '#CFE7FF',

        danger: 'var(--color-text-danger)',
        dangerLight: '#E09497',

        neutral0: 'var(--color-background-secondary)',
        neutral5: '#FBFCFD',
        neutral10: 'var(--color-background-tertiary)',

        neutral20: 'var(--color-text-tertiary)',
        neutral30: '#949699',
        neutral40: '#6E7073',
        neutral50: 'var(--color-text-secondary)',

        neutral60: '#36383A',
        neutral70: '#242527',
        neutral80: '#121313',
        neutral90: 'var(--color-text-primary)',
      },
    })}
    styles={{
      container: base => ({
        ...base,
        userSelect: 'none',
        width: '100%',
        fontFamily: 'var(--font-primary)',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '0.875em',
      }),
      control: base => ({
        ...base,
        cursor: 'pointer',
        border: 'var(--border-primary)',
        borderRadius: '0.25em',
        padding: '0.25em',
      }),
      option: base => ({
        ...base,
        cursor: 'pointer',
        borderBottom: 'var(--border-primary)',
        padding: '0.875em',
      }),
      menuList: base => ({
        ...base,
        borderRadius: '0.25em',
        border: 'var(--border-primary)',
        boxShadow: 'var(--shadow-primary)',
        padding: '0',
        margin: '0',
        overflow: 'clip',
      }),
    }}
  />
);

export default Select;

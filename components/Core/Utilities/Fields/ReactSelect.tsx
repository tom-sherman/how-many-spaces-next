import Select from 'react-select';
import SelectProps from 'react-select/dist/declarations/src/Select';

export default function CustomSelect (props: SelectProps) {
    return (
        <Select
            styles={{
                container: (baseStyles) => ({
                    ...baseStyles,
                    minWidth: '130px'
                }),
                control: (styles) => ({
                    ...styles,
                    cursor: 'pointer',
                }),
                option: (styles) => ({
                    ...styles,
                    cursor: 'pointer',
                })
            }}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary: 'var(--colour-blue)',
                    primary75: 'var(--colour-blue)',
                }
            })}
            {...props}
        />
    )
}
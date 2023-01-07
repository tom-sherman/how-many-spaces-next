import Select from 'react-select';
import { CarParkSortParameters } from "@/types/CarParks"
import { useMemo } from "react";
import styled from "styled-components";
import BreakpointValues from '@/styles/breakpoints';

const Container = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 8px;

    label {
        font-weight: bold;
        padding-bottom: 2px;
        margin-right: 6px;
        width: 40%;
        white-space: nowrap;

        @media (min-width: ${BreakpointValues.ds}) {
            width: auto;
        }
    }
`

type CarParkSortSelectorProps = {
    sort: CarParkSortParameters,
    options: CarParkSortParameters[],
    onSelect: Function,
}

type OptionType = { [value: string]: any }
type OptionsType = Array<OptionType>

export default function CarParkSortSelector(props: CarParkSortSelectorProps) {
    const {
        sort,
        options,
        onSelect,
    } = props;

    const optionsForSelect = useMemo<OptionsType>(() => {
        return options.map(option => {
            const value = option.toString();
            let label = '';

            switch(value) {
                case CarParkSortParameters.SPACES_DESC:
                    label = 'Most spaces';
                    break;
                case CarParkSortParameters.CITY_CENTRE_DISTANCE_ASC:
                    label = 'Closest to city centre';
                    break;
                case CarParkSortParameters.TRAIN_STATION_DISTANCE_ASC:
                    label = 'Closest to train station';
                    break;
            }

            return {
                value,
                label
            };
        })
    }, [options]);

     return (
        <Container>
            <label htmlFor="car_park_sort_select">Sort by:</label>
            <Select
                id="car_park_sort_select"
                defaultValue={{ value: 'SPACES_DESC', label: 'Most spaces' }}
                styles={{
                    container: (baseStyles) => ({
                        ...baseStyles,
                        width: '100%',
                        minWidth: '130px',
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
                value={optionsForSelect.filter(({ value }) => value === sort)}
                options={optionsForSelect}
                onChange={(newValue) => onSelect(newValue?.value)}
            />
        </Container>
     )
}
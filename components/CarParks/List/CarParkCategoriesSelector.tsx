import Select from 'react-select';
import BreakpointValues from "@/styles/breakpoints"
import { CategoryResponse } from "@/types/API"
import { CarParkCategories } from "@/types/CarParks"
import { useMemo, useState } from "react"
import styled from "styled-components"

type CarParkCategoriesProps = {
    category: CarParkCategories,
    categories: CategoryResponse[],
    visibleCategories: CarParkCategories[],
    onSelect: Function,
}

const MobileDisplay = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 14px;

    @media (min-width: ${BreakpointValues.ts}) {
        display: none;
    }

    label {
        font-weight: bold;
        padding-bottom: 2px;
        margin-right: 6px;
        width: 40%;
    }

`

const CategoriesList = styled.div`
    display: none;
    flex-direction: column;

    @media (min-width: ${BreakpointValues.ts}) {
        display: flex;
        flex-direction: row;
    }
`

type CategoryItemProps = {
    selected: boolean,
}

const CategoryItem = styled.button<CategoryItemProps>`
    position: relative;
    color: var(--colour-grey);
    cursor: pointer;
    padding: 5px 10px;
    text-align: center;
    min-width: 50px;
    user-select: none;

    &:hover {
        color: var(--colour-black);
    }

    &::after {
        position: absolute;
        display: none;
        top: 100%;
        left: 0;
        width: 100%;
        height: ${props => props.selected ? '3px' : 0};
        opacity: ${props => props.selected ? 1 : 0};
        background-color: var(--colour-blue);
        content: '';
    }

    @media (min-width: ${BreakpointValues.ts}) {
        padding-top: 0;
        padding-bottom: 14px;
        margin-right: 10px;
        font-size: 18px;

        &::after {
            display: block;
        }
    }
`;

type OptionType = { [value: string]: any }
type OptionsType = Array<OptionType>

export default function CarParkCategoriesSelector(props: CarParkCategoriesProps) {
    const optionsForSelect = useMemo<OptionsType>(() => {
        return props.visibleCategories
            .map<CategoryResponse|undefined>(category => props.categories.find(searchCategory => searchCategory.category === category))
            .map(option => {
                const value = option?.category
                let label = option?.name;
                return {
                    value,
                    label
                };
            })
    }, props.visibleCategories);

    return (
        <>
        <MobileDisplay>
            <label htmlFor="car_park_sort_select">Show:</label>
            <Select
                id="car_park_category_select"
                defaultValue={{ value: 'SPACES_DESC', label: 'Most spaces' }}
                styles={{
                    container: (baseStyles) => ({
                        ...baseStyles,
                        width: '100%',
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
                value={optionsForSelect.filter(({ value }) => value === props.category)}
                options={optionsForSelect}
                onChange={(newValue) => props.onSelect(newValue?.value)}
            />
        </MobileDisplay>
        <CategoriesList>
            {
                props.visibleCategories
                    .map<CategoryResponse|undefined>(category => props.categories.find(searchCategory => searchCategory.category === category))
                    .filter(value => !!value)
                    .map(category => (
                        <CategoryItem key={category?.category} selected={category?.category === props.category} onClick={() => props.onSelect(category?.category)}>
                            { category?.name }
                        </CategoryItem>
                ))
            }
        </CategoriesList>
        </>
    )
}
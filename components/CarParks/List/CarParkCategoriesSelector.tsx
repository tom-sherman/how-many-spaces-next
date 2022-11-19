import BreakpointValues from "@/styles/breakpoints"
import { CategoryResponse } from "@/types/API"
import { CarParkCategories } from "@/types/CarParks"
import { useState } from "react"
import styled from "styled-components"

type CarParkCategoriesProps = {
    category: CarParkCategories,
    categories: CategoryResponse[],
    onSelect: Function,
}

const MobileDisplay = styled.button`
    display: flex;

    @media (min-width: ${BreakpointValues.ts}) {
        display: none;
    }
`

const CategoriesList = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: ${BreakpointValues.ts}) {
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
        background-color: var(--colour-blue);
        content: '';
    }

    @media (min-width: ${BreakpointValues.ts}) {
        padding-top: 0;
        margin-right: 10px;

        &::after {
            display: block;
        }
    }
`;

export default function CarParkCategoriesSelector(props: CarParkCategoriesProps) {
    const [mobileIsOpen, setMobileIsOpen] = useState(false);

    return (
        <div>
            <MobileDisplay>
                <span>{ props.categories.find(value => value.category === props.category)?.name }</span>
            </MobileDisplay>
            <CategoriesList>
                {
                    props.categories.map(category => (
                        <CategoryItem key={category.category} selected={category.category === props.category} onClick={() => props.onSelect(category.category)}>
                            { category.name }
                        </CategoryItem>
                    ))
                }
            </CategoriesList>
        </div>
    )
}
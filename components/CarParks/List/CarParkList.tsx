import { CarParkCategories } from "@/types/CarParks";
import { useState } from "react";
import breakpoints from "@/styles/breakpoints";
import styled from "styled-components";
import CarParkCategoriesSelector from "./CarParkCategoriesSelector";
import CarPark from '../CarPark';
import { ListResponse } from "@/types/API";

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--colour-grey--lighter);
`

const List = styled.div`
    display: flex;
    flex-direction: column;
`

type CarParkListProps = {
    data: ListResponse,
    onCategoryChange: Function,
}

export default function CarParkList(props: CarParkListProps) {
    const {
        data,
        onCategoryChange,
    } = props;

    return (
        <>
            <Top>
                <CarParkCategoriesSelector
                    category={data.category}
                    categories={data.categories}
                    onSelect={onCategoryChange}
                />
            </Top>
            <List>
                {
                    data.carParks.map(carPark => <CarPark carPark={carPark} />)
                }
            </List>
        </>
    )
}
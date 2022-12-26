import { CarPark as CarParkContract, CarParkCategories, CarParkSortParameters } from "@/types/CarParks";
import styled from "styled-components";
import CarParkCategoriesSelector from "./CarParkCategoriesSelector";
import CarPark from '../CarPark';
import { ListResponse } from "@/types/API";
import CarParkSortSelector from "./CarParkSortSelector";
import BreakpointValues from "@/styles/breakpoints";

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--colour-grey--lighter);

    @media (min-width: ${BreakpointValues.ts}) {
        align-items: baseline;
    }
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px 0 0;
`

type CarParkListProps = {
    data: ListResponse,
    onCategoryChange: Function,
    onSortChange: Function,
}

export default function CarParkList(props: CarParkListProps) {
    const {
        data,
        onCategoryChange,
        onSortChange,
    } = props;

    return (
        <>
            <Top>
                <CarParkCategoriesSelector
                    category={data.category}
                    categories={data.categories}
                    visibleCategories={[CarParkCategories.CAR_PARK, CarParkCategories.PARK_AND_RIDE, CarParkCategories.ALL]}
                    onSelect={onCategoryChange}
                />
                <CarParkSortSelector
                    sort={data.sort}
                    options={Object.values(CarParkSortParameters)}
                    onSelect={onSortChange}
                />
            </Top>
            <List>
                {
                    data.data.map(carPark => <CarPark key={carPark.url} carPark={carPark} />)
                }
            </List>
        </>
    )
}